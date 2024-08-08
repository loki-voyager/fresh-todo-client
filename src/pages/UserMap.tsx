import { useSelector } from "react-redux";
import "../App.css";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  AdminGetUsers,
  AdminGetUsersResProps,
} from "../service/Admin/AdminGetUsers";
import { UsersListType } from "../types/UserTypes/UserTypes";
import { Pagination } from "../components/Pagination";
import { UserOne } from "../components/Admin/UserOne";

const UserMap = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UsersListType[]>([]);
  const admin = useSelector((state: RootState) => state.user.data);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState("");

  const isAdminOrOwner = admin?.roles.some(
    (role) => role.includes("admin") || role.includes("owner")
  );

  if (!isAdminOrOwner || !admin) {
    navigate("/");
  }

  const UsersGetHandler = useCallback(
    async (loading?: boolean) => {
      if (admin?.token) {
        loading && setLoading("Loading Users List");
        setError("");
        await AdminGetUsers({ setError, token: admin.token, limit, page }).then(
          ({ users, pages, totalCount }: AdminGetUsersResProps) => {
            if (users && pages && totalCount) {
              setUsers(users);
              setNumOfPages(pages);
            }
            loading && setLoading("");
          }
        );
      }
    },
    [admin?.token, limit, page]
  );

  useEffect(() => {
    UsersGetHandler(true);
  }, [page, limit, UsersGetHandler]);

  return (
    admin && (
      <div className="wrapper">
        <h1>UserList</h1>
        {error && <div>{error}</div>}
        <div className="usersWrapper">
          <Pagination
            numOfPages={numOfPages}
            setPage={setPage}
            currentPage={page}
            setLimit={setLimit}
            limit={limit}
          />
          {loading ? (
            <>{loading}</>
          ) : (
            <>
              {users ? (
                <div className="usersList">
                  {users.map((user: UsersListType) => (
                    <UserOne
                      UsersGetHandler={UsersGetHandler}
                      adminRoles={admin.roles}
                      setError={setError}
                      token={admin.token}
                      user={user}
                      key={user._id}
                    />
                  ))}
                </div>
              ) : (
                <div>User not yet</div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default UserMap;
