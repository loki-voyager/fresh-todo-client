import { useEffect, useState } from "react";
import { Base64Pic } from "../Pic/Base64Pic";
import { UserType } from "../../types/UserTypes/UserTypes";
import { SignOut } from "../../service/SignOut";
import { TakeUserPic } from "../../function/User/TakeUserPic";
import { UserDelete } from "../../service/User/UserDelete";
import moment from "moment";

type ProfileProps = {
  userState: UserType;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const Profile = ({ userState, setError, setEdit }: ProfileProps) => {
  const [base64Codes, setBase64Codes] = useState<string[]>([]);
  useEffect(() => {
    if (userState) {
      TakeUserPic({
        username: userState.username,
        token: userState.token,
        setPic: setBase64Codes,
        setError,
      });
    }
  }, [userState]);

  const handleDelete = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this account?_?"
    );
    if (userConfirmed) {
      setError("")
      await UserDelete({
        data: userState.username,
        token: userState.token,
        setError,
      });
      console.log("Account was deleted, bye (╥﹏╥)");
    } else {
      console.log("Account deletion has been cancelled >ᴗ<");
    }
  };

  return (
    <div>
      <Base64Pic base64Codes={base64Codes} />
      <h1>username: {userState.username}</h1>
      <div>email: {userState.email}</div>
      <div>roles: {userState.roles}</div>
      <div>
        date: {moment(userState.date).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      <div className="btnLine">
        <button
          className="btnGreen"
          onClick={() => {
            setEdit((state) => !state);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            SignOut();
          }}
          className="btnRed"
        >
          LogOut
        </button>
        <button
          onClick={() => {
            handleDelete();
          }}
          className="btnRed"
        >
          Deleted
        </button>
      </div>
    </div>
  );
};
export { Profile };
export type { ProfileProps };
