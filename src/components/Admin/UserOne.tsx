import { useNavigate } from "react-router-dom";
import { OwnerGiveAdminRole } from "../../service/Owner/OwnerGiveAdminRole";
import { OwnerTakeTheAdminRole } from "../../service/Owner/OwnerTakeTheAdminRole";
import { UsersListType } from "../../types/UserTypes/UserTypes";
import { AdminUserDelete } from "../../service/Admin/AdminUserDelete";
import { useState } from "react";

type UserOneProps = {
  UsersGetHandler: (loading?: boolean) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  user: UsersListType;
  adminRoles: string[];
  token: string;
};

const UserOne = ({
  UsersGetHandler,
  setError,
  user,
  adminRoles,
  token,
}: UserOneProps) => {
  const navigate = useNavigate();
  const { _id, date, email, roles, username } = user;
  const isOwner = adminRoles.includes("owner");
  const isAdmin = adminRoles.includes("admin");
  const userIsAdmin = user.roles.includes("admin");
  const userIsOwner = user.roles.includes("owner");
  const [loading, setLoading] = useState("");

  const OwnerGiveAdminRoleHandler = async ({
    username,
    token,
  }: {
    username: string;
    token: string;
  }) => {
    setLoading("User loading...");
    setError("")
    await OwnerGiveAdminRole({ username, token, setError }).then(
      async (res) => {
        if (res) {
          await UsersGetHandler().then(() => {
            setLoading("");
          });
        }
      }
    );
  };
  const OwnerTakeTheAdminRoleHandler = async ({
    username,
    token,
  }: {
    username: string;
    token: string;
  }) => {
    setLoading("User loading...");
    setError("")
    await OwnerTakeTheAdminRole({ username, token, setError }).then(
      async (res) => {
        if (res) {
          await UsersGetHandler().then(() => {
            setLoading("");
          });
        }
      }
    );
  };

  const ProfileUserHandle = ({ id }: { id: string }) => {
    navigate(`/UserProfileAdmin/${id}`);
  };

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
          await UsersGetHandler(true);
        }
      });
    }
  };

  return (
    <div key={_id} className="userBlock">
      {loading ? (
        <div>{loading}</div>
      ) : (
        <>
          <div className="userBlockInfo">
            <div>_id: {_id}</div>
            <div>username: {username}</div>
            <div>email: {email}</div>
            <div>date: {date}</div>
            <div>roles: {roles}</div>
          </div>
          <div className="userBlockBtn">
            {isOwner && (
              <button
                className="btnGreen"
                onClick={() => {
                  {
                    userIsAdmin
                      ? OwnerTakeTheAdminRoleHandler({
                          username,
                          token,
                        })
                      : OwnerGiveAdminRoleHandler({
                          username,
                          token,
                        });
                  }
                }}
              >
                {userIsAdmin ? "Take the Admin role" : "Give Admin role"}
              </button>
            )}
            <button
              className="btnGreen"
              onClick={() => {
                ProfileUserHandle({ id: _id });
              }}
            >
              Profiles
            </button>
            <button
              className={
                (isAdmin && userIsAdmin) || userIsOwner
                  ? "BtnDisabled"
                  : "BtnRed"
              }
              onClick={() => {
                !userIsAdmin &&
                  DeleteUserHandle({
                    id: _id,
                    token,
                  });
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export { UserOne };
