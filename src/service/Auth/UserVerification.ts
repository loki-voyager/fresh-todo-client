import { config } from "../../config";

const UserVerification = async ({
  username,
  email,
  code,
  token,
  setError,
}: {
  username: string;
  email: string;
  code: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/UserVerification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, email, code }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { tokenForRegistration } = await res.json();
    return tokenForRegistration;
  } catch (error: any) {
    setError(error.message);
  }
};

export { UserVerification };
