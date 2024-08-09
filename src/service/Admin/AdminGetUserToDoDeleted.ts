import { config } from "../../config";
import { ToDoDeletedGetResProps } from "../ToDo/ToDoDeletedGet";

const AdminGetUserToDoDeleted = async ({
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
    const res = await fetch(`${config.url}/AdminGetUserToDoDeleted`, {
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
export { AdminGetUserToDoDeleted };
