import { SignOut } from "../SignOut";

const UserDelete = async ({
  data,
  token,
  setError,
}: {
  data: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch("http://localhost:8080/UserDelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { deleted } = await res.json();
    SignOut();
  } catch (error: any) {
    setError(error.message);
    return [];
  }
};

export { UserDelete };
