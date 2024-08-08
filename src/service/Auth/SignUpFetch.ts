import { SignUpResProps } from "../../types/AuthTypes/SignUpTypes";

const SignUpFetch = async ({
  username,
  password,
  email,
  pic,
  token,
  setError,
}: {
  username: string;
  password: string;
  email: string;
  pic?: string[];
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    if (pic == undefined) {
      pic = [];
    }
    const res = await fetch("http://localhost:8080/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, password, email, pic }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { user }: SignUpResProps = await res.json();
    localStorage.removeItem("UserSignUp")
    return user
  } catch (error: any) {
    setError(error.message);
  }
};

export { SignUpFetch };
