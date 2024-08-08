import { useSelector } from "react-redux";
import "../App.css";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { ProfileForAdmin } from "../components/Admin/ProfileForAdmin";
import { UserToDoMap } from "../components/Admin/UserToDoMap";
import { UserToDoCompletedMap } from "../components/Admin/UserToDoCompletedMap";
import { UserToDoDeletedMap } from "../components/Admin/UserToDoDeletedMap";

function UserProfileAdmin() {
  const admin = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();

  if (!admin?.roles.some((str) => str.includes("admin")) || !admin) {
    navigate("/");
  }

  return (
    admin && (
      <div className="wrapper">
        {admin && (
          <div className="adminUserToDoWrapper">
            <ProfileForAdmin admin={admin}/>
            <UserToDoMap admin={admin}/>
            <UserToDoCompletedMap admin={admin}/>
            <UserToDoDeletedMap admin={admin}/>
          </div>
        )}
      </div>
    )
  );
}

export default UserProfileAdmin;
