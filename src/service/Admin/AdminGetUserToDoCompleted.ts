import { ToDoCompletedGetResProps } from "../ToDo/ToDoCompletedGet";

const AdminGetUserToDoCompleted = async ({
  userId,
  token,
  page,
  limit,
  setError,
}: {
  userId: string;
  token: string;
  page: number;
  limit: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch("http://localhost:8080/AdminGetUserToDoCompleted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, page, limit }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { todos, totalCount, pages } = await res.json();
    return { todos, totalCount, pages } as ToDoCompletedGetResProps;
  } catch (error: any) {
    setError(error.message);
    return { todos: [], totalCount: 0, pages: 0 } as ToDoCompletedGetResProps;
  }
};
export { AdminGetUserToDoCompleted };
