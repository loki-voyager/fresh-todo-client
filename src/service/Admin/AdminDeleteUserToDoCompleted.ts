import { config } from "../../config";

const AdminDeleteUserToDoCompleted = async ({
    id,
    token,
    setError,
  }: {
    id: string;
    token: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    try {
      const res = await fetch(`${config.url}/AdminDeleteUserToDoCompleted`, {
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
  export { AdminDeleteUserToDoCompleted };
  