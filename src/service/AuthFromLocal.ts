import { UserDataComparison } from "./Auth/UserDataComparison";

const getTokenFromLocalStorage = () => {
  const tokenString = localStorage.getItem("token");
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  return null;
};

type AuthFromLocalProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const AuthFromLocal = async ({ setError }: AuthFromLocalProps) => {

  const token = getTokenFromLocalStorage();

  if (token) {
    const user = await UserDataComparison({ token, setError });
    return user;
  }
};

export { getTokenFromLocalStorage, AuthFromLocal };
