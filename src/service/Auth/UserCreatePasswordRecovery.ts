import { config } from "../../config";

const UserCreatePasswordRecovery = async ({
  email,
  setError,
}: {
  email: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/UserCreatePasswordRecovery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { craeteVerStateWithToken } = await res.json();
    return craeteVerStateWithToken.token;
  } catch (error: any) {
    setError(error.message);
  }
};

export { UserCreatePasswordRecovery };
