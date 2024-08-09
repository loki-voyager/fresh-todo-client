import { config } from "../../config";
import { SignInFetch } from "../Auth/SignInFetch";

type EditUserType = {
  oldUsername: string;
  username: string;
  password: string;
  email: string;
  pic: string[];
};

const UserEdit = async ({
  user,
  token,
  setError,
}: {
  user: EditUserType;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const res = await fetch(`${config.url}/UserEdit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message);
    }

    const { edited } = await res.json();
    await SignInFetch({
      data: edited.username,
      password: user.password,
      setError,
    })
    return true
  } catch (error: any) {
    setError(error.message);
    console.log({error});

  }
};

export { UserEdit };

export type { EditUserType };
