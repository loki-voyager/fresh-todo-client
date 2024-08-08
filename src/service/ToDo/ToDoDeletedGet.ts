import { ToDoDeletedTypes } from "../../types/ToDoTypes/ToDoTypes";

type ToDoDeletedGetResProps = {
  todos: ToDoDeletedTypes[];
  totalCount: number;
  pages: number;
};

const ToDoDeletedGet = async ({
  token,
  userId,
  page,
  limit,

  setError,
}: {
  token: string;
  userId: string;
  page: number;
  limit: number;

  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch("http://localhost:8080/ToDoDeletedGet", {
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
    return { todos, totalCount, pages } as ToDoDeletedGetResProps;
  } catch (error: any) {
    setError(error.message);
    return { todos: [], totalCount: 0, pages: 0 } as ToDoDeletedGetResProps;
  }
};
export { ToDoDeletedGet };
export type {ToDoDeletedGetResProps}