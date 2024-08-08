import { Base64Pic } from "../Pic/Base64Pic";
import { UserType, UserTypeForAdmin } from "../../types/UserTypes/UserTypes";
import moment from "moment";
import { AdminUserDelete } from "../../service/Admin/AdminUserDelete";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminGetOneUser } from "../../service/Admin/AdminGetOneUser";

type ProfileForAdminProps = {
  admin: UserType;
};

const ProfileForAdmin = ({ admin }: ProfileForAdminProps) => {
  const { id } = useParams();
  const [user, setUser] = useState<UserTypeForAdmin>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const UsersGetHandle = async () => {
    if (admin?.token && id) {
      setError("")
      await AdminGetOneUser({ id, token: admin.token, setError }).then((res)=>{
        if(res)
          setUser(res)
      });
    }
  };

  useEffect(() => {
    UsersGetHandle();
  }, []);

  const DeleteUserHandle = async ({
    id,
    token,
  }: {
    id: string;
    token: string;
  }) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this account?_?"
    );
    if (userConfirmed) {
      setError("")
      await AdminUserDelete({ id, setError, token }).then(async (res) => {
        if (res?.status) {
          navigate("/UserList");
        }
      });
    }
  };

  return (
    <>
      {error && <div>{error}</div>}
      {user && admin?.token ? (
        <div>
          <Base64Pic base64Codes={user.pic} />
          <h1>username: {user.username}</h1>
          <div>email: {user.email}</div>
          <div>roles: {user.roles}</div>
          <div>date: {moment(user.date).format("YYYY-MM-DD HH:mm:ss")}</div>
          <div className="btnLine">
            <button
              onClick={() => {
                DeleteUserHandle({ id: user._id, token: admin?.token });
              }}
              className="btnRed"
            >
              Deleted
            </button>
          </div>
        </div>
      ) : (
        <h1>User Profile Loading...</h1>
      )}
    </>
  );
};
export { ProfileForAdmin };
export type { ProfileForAdminProps };
