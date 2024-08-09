import { config } from "../../config";

const UserChechExist = async ({
  username,
  email,
  setError,
}: {
  username: string;
  email: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/UserChechExist`, {
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

    const { exist } = await res.json();
    return exist
  } catch (error: any) {
    setError(error.message);
  }
};

export { UserChechExist };
