import { config } from "../../config";

const ToDoComplete = async ({
    token,
    id,
    setError,
  }: {
    token: string;
    id: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    try {
      const res = await fetch(`${config.url}/ToDoComplete`, {
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
  
      const { completed } = await res.json();
      return completed;
    } catch (error: any) {
      setError(error.message);
    }
  };
  export { ToDoComplete };
  