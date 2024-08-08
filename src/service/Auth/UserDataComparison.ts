import { SignInResProps } from "../../types/AuthTypes/SignInTypes";
import { UserType } from "../../types/UserTypes/UserTypes";

type UserDataComparisonProps = {
  token?: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const UserDataComparison = async ({
  token,
  setError,
}: UserDataComparisonProps) => {
  try {
    const res = await fetch("http://localhost:8080/UserDataComparison", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { user }: SignInResProps = await res.json();  
    return user;
  } catch (error: any) {
    setError(error);
  }
};

export { UserDataComparison };
