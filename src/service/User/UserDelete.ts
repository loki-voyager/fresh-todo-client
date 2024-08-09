import { config } from "../../config";
import { SignOut } from "../SignOut";

const UserDelete = async ({
  data,
  token,
  setError,
}: {
  data: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/UserDelete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { deleted } = await res.json();
    deleted && SignOut();
  } catch (error: any) {
    setError(error.message);
    return [];
  }
};

export { UserDelete };
