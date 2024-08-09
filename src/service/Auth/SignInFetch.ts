import { config } from "../../config";
import { SignInResProps } from "../../types/AuthTypes/SignInTypes";

const SignInFetch = async ({
  data,
  password,
  setError,
}: {
  data: string;
  password: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/SignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, password }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      console.log({message});
      throw new Error(message);
    }

    const { user }: SignInResProps = await res.json();
    localStorage.setItem("token", JSON.stringify(user.token));
    return user;
  } catch (error: any) {
    setError(error.message);
    console.log({error});
  }
};

export { SignInFetch };
