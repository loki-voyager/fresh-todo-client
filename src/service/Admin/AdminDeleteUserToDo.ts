import { config } from "../../config";

const AdminDeleteUserToDo = async ({
    id,
    token,
    setError,
  }: {
    id: string;
    token: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    try {
      const res = await fetch(`${config.url}/AdminDeleteUserToDo`, {
        method: "DELETE",
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
  
      const { deleted } = await res.json();
      return { status: deleted };
    } catch (error: any) {
      setError(error.message);
    }
  };
  export { AdminDeleteUserToDo };
  