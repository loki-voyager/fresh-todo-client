import { useEffect, useState } from "react";
import moment from "moment";
import { Base64Pic } from "../Pic/Base64Pic";
import { useParams } from "react-router-dom";
import { UserType } from "../../types/UserTypes/UserTypes";
import { Pagination } from "../Pagination";
import { ToDoDeletedTypes } from "../../types/ToDoTypes/ToDoTypes";
import { AdminGetUserToDoDeleted } from "../../service/Admin/AdminGetUserToDoDeleted";
import { ToDoDeletedGetResProps } from "../../service/ToDo/ToDoDeletedGet";
import { AdminDeleteUserToDoDeleted } from "../../service/Admin/AdminDeleteUserToDoDeleted";

type UserToDoDeletedMapMapProps = {
  admin: UserType;
};

const UserToDoDeletedMap = ({ admin }: UserToDoDeletedMapMapProps) => {
  const { id } = useParams();
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);
  const [todos, setTodos] = useState<ToDoDeletedTypes[]>();
  const [error, setError] = useState("");

  const UserToDoGetHandler = async (loading?: boolean) => {
    loading && setLoading("Loading ToDo List");
    setError("")
    id &&
      (await AdminGetUserToDoDeleted({
        userId: id,
        limit,
        page,
        setError,
        token: admin?.token,
      }).then(({ pages, todos, totalCount }: ToDoDeletedGetResProps) => {
        if (pages && todos && totalCount) {
          setTodos(todos);
          setNumOfPages(pages);
        }
        loading && setLoading("");
      }));
  };

  useEffect(() => {
    UserToDoGetHandler(true);
  }, [page, limit]);

  useEffect(() => {}, [todos, numOfPages]);

  const ToDoDeleteHandler = async ({ id }: { id: string }) => {
    setError("")
    await AdminDeleteUserToDoDeleted({
      id,
      setError,
      token: admin?.token,
    }).then((res) => {
      if (res) UserToDoGetHandler(true);
    });
  };

  return (
    <>
      <h1>ToDo</h1>
      {error && <div>{error}</div>}
      {numOfPages > 1 && (
        <Pagination
          numOfPages={numOfPages}
          setPage={setPage}
          currentPage={page}
          setLimit={setLimit}
          limit={limit}
        />
      )}
      <div className="toDoWrapper">
        {loading ? (
          <>{loading}</>
        ) : (
          <>
            {todos ? (
              <>
                {todos.map(
                  ({
                    _id,
                    body,
                    pic,
                    status,
                    deleted,
                    generated,
                  }: ToDoDeletedTypes) => (
                    <div key={_id} className="toDoBlock">
                      <div className="toDoBlockInfo">
                        <div>body: {body}</div>
                        <div>
                          generated:{" "}
                          {moment(generated).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                        <div>
                          deleted:{" "}
                          {moment(deleted).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                        <div>status: {status}</div>
                        <Base64Pic base64Codes={pic} />
                      </div>
                      <div className="toDoBtnBlock">
                        <button
                          className="btnRed"
                          onClick={() => {
                            ToDoDeleteHandler({ id: _id });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                )}
              </>
            ) : (
              <div>There are no deleted ToDos yet</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { UserToDoDeletedMap };
