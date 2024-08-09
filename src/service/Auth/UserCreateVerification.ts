import { config } from "../../config";

const UserCreateVerification = async ({
  username,
  email,
  setError,
}: {
  username: string;
  email: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/UserCreateVerification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { craeteVerStateWithToken } = await res.json();
    return craeteVerStateWithToken.token
  } catch (error: any) {
    setError(error.message);
  }
};

export { UserCreateVerification };
