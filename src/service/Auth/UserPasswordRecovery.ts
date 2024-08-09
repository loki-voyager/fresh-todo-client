import { config } from "../../config";

const UserPasswordRecovery = async ({
    email,
    code,
    password,
    token,
    setError,
  }: {
    email: string;
    code:string,
    password:string;
    token:string;
    setError: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    try {
      const res = await fetch(`${config.url}/UserPasswordRecovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email,code,password }),
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const { user } = await res.json();
      return user;
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  export { UserPasswordRecovery };
  