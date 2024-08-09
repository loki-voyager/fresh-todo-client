import { config } from "../../config";
import { ToDoCompletedTypes } from "../../types/ToDoTypes/ToDoTypes";

type ToDoCompletedGetResProps = {
  todos: ToDoCompletedTypes[];
  totalCount: number;
  pages: number;
};

const ToDoCompletedGet = async ({
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
    const res = await fetch(`${config.url}/ToDoCompletedGet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId,page,limit }),
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
export { ToDoCompletedGet };
export type { ToDoCompletedGetResProps };
