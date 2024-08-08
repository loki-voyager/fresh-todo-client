import { UserType } from "../../types/UserTypes/UserTypes";

const OwnerTakeTheAdminRole = async ({
  username,
  token,
  setError,
}: {
  username: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch("http://localhost:8080/OwnerTakeTheAdminRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { edited } = await res.json();
    return edited
  } catch (error: any) {
    setError(error.message);
    return [];
  }
};

export { OwnerTakeTheAdminRole };