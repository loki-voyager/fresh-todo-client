const ToDoCompletedReturn = async ({
    token,
    id,
    setError,
  }: {
    token: string;
    id: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    try {
      const res = await fetch("http://localhost:8080/ToDoCompletedReturn", {
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
  
      const { todo } = await res.json();
      return todo;
    } catch (error: any) {
      setError(error.message);
    }
  };
  export { ToDoCompletedReturn };
  