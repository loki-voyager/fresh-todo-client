import { ToDoTypes } from "../../types/ToDoTypes/ToDoTypes";

const ToDoPost = async ({
  token,
  body,
  pic,
  setError,
}: {
  token: string;
  body: string;
  pic?: string[];
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    if (pic == undefined) {
      pic = [];
    }
    const res = await fetch("http://localhost:8080/ToDoPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body, pic }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { task } = await res.json();
    return task;
  } catch (error: any) {
    setError(error.message);
  }
};
export { ToDoPost };
