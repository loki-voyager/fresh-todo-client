import { config } from "../../config";
import { UsersListType } from "../../types/UserTypes/UserTypes";

type AdminGetUsersResProps = {
  users: UsersListType[];
  totalCount: number;
  pages: number;
};

const AdminGetUsers = async ({
  token,
  page,
  limit,
  setError,
}: {
  token: string;
  page: number;
  limit: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/AdminGetUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ page,limit }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { users, totalCount, pages } = await res.json();
    return { users, totalCount, pages } as AdminGetUsersResProps;
  } catch (error: any) {
    setError(error.message);
    return { users: [], totalCount: 0, pages: 0 } as AdminGetUsersResProps;
  }
};
export { AdminGetUsers };
export type {AdminGetUsersResProps}