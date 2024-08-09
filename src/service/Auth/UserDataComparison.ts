import { config } from "../../config";
import { SignInResProps } from "../../types/AuthTypes/SignInTypes";

type UserDataComparisonProps = {
  token?: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const UserDataComparison = async ({
  token,
  setError,
}: UserDataComparisonProps) => {
  try {
    const res = await fetch(`${config.url}/UserDataComparison`, {
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
