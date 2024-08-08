import { UserPicGet } from "../../service/User/UserPicGet";

type TakePicProps = {
  username: string;
  token: string;
  setPic: React.Dispatch<React.SetStateAction<string[]>>
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const TakeUserPic = async ({ username, token,setPic,setError }: TakePicProps) => {
  setError("");
  try {
    const buff: string[] = await UserPicGet({
      data: username,
      token,
      setError,
    });
    if (buff.length > 0) {
      setPic(buff);
    }
  } catch (error) {
    console.error({ error });
  }
};

export { TakeUserPic };
