import { useEffect, useState } from "react";
import moment from "moment";
import { ToDoCompletedTypes } from "../../types/ToDoTypes/ToDoTypes";
import { Base64Pic } from "../Pic/Base64Pic";
import { useParams } from "react-router-dom";
import { UserType } from "../../types/UserTypes/UserTypes";
import { Pagination } from "../Pagination";
import { AdminGetUserToDoCompleted } from "../../service/Admin/AdminGetUserToDoCompleted";
import { ToDoCompletedGetResProps } from "../../service/ToDo/ToDoCompletedGet";
import { AdminDeleteUserToDoCompleted } from "../../service/Admin/AdminDeleteUserToDoCompleted";

type UserToDoCompletedMapProps = {
  admin: UserType;
};

const UserToDoCompletedMap = ({ admin }: UserToDoCompletedMapProps) => {
  const { id } = useParams();
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);
  const [todos, setTodos] = useState<ToDoCompletedTypes[]>();
  const [error, setError] = useState("");

  const UserToDoGetHandler = async (loading?: boolean) => {
    loading && setLoading("Loading ToDo List");
    setError("")
    id &&
      (await AdminGetUserToDoCompleted({
        userId: id,
        limit,
        page,
        setError,
        token: admin?.token,
      }).then(({ pages, todos, totalCount }: ToDoCompletedGetResProps) => {
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
    await AdminDeleteUserToDoCompleted({ id, setError, token: admin?.token }).then(
      (res) => {
        if (res) UserToDoGetHandler(true);
      }
    );
  };

  return (
    <>
      {error && <div>{error}</div>}
      <h1>ToDo Completed</h1>
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
                    completed,
                    generated,
                  }: ToDoCompletedTypes) => (
                    <div key={_id} className="toDoBlock">
                      <div className="toDoBlockInfo">
                        <div>body: {body}</div>
                        <div>
                          generated:{" "}
                          {moment(generated).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                        <div>
                          completed:{" "}
                          {moment(completed).format("YYYY-MM-DD HH:mm:ss")}
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
              <div>There are no completed ToDos yet</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { UserToDoCompletedMap };
