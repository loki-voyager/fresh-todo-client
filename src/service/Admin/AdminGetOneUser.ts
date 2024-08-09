import { config } from "../../config";

const AdminGetOneUser = async ({
  id,
  token,
  setError,
}: {
  id: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/AdminGetOneUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { user } = await res.json();
    return user;
  } catch (error: any) {
    setError(error.message);
  }
};
export { AdminGetOneUser };
