type ToDoEditProps = {
  id: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  pic: string[];
};

const ToDoEdit = async ({ id, token, setError, body, pic }: ToDoEditProps) => {
  try {
    const res = await fetch("http://localhost:8080/ToDoEdit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, body, pic }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { edited } = await res.json();
    return edited;
  } catch (error: any) {
    setError(error.message);
  }
};

export { ToDoEdit };
