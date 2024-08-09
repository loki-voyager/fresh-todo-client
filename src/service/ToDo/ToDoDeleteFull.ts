import { config } from "../../config";

const ToDoDeleteFull = async ({
    token,
    id,
    setError,
  }: {
    token: string;
    id: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    try {
      const res = await fetch(`${config.url}/ToDoDeleteFull`, {
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
      return deleted;
    } catch (error: any) {
      setError(error.message);
    }
  };
  export { ToDoDeleteFull };
  