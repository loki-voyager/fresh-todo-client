import { useEffect, useState } from "react";
import moment from "moment";
import { ToDoTypes } from "../../types/ToDoTypes/ToDoTypes";
import { Base64Pic } from "../Pic/Base64Pic";
import { UserToDoGet } from "../../service/Admin/UserToDoGet";
import { useParams } from "react-router-dom";
import { UserType } from "../../types/UserTypes/UserTypes";
import { ToDoGetResProps } from "../../service/ToDo/ToDoGet";
import { Pagination } from "../Pagination";
import { AdminDeleteUserToDo } from "../../service/Admin/AdminDeleteUserToDo";

type UserToDoMapProps = {
  admin: UserType;
};

const UserToDoMap = ({ admin }: UserToDoMapProps) => {
  const { id } = useParams();
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);
  const [todos, setTodos] = useState<ToDoTypes[]>();
  const [error, setError] = useState("");

  const UserToDoGetHandler = async (loading?: boolean) => {
    loading && setLoading("Loading ToDo List");
    setError("")
    id &&
      (await UserToDoGet({
        userId: id,
        limit,
        page,
        setError,
        token: admin?.token,
      }).then(({ pages, todos, totalCount }: ToDoGetResProps) => {
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
    await AdminDeleteUserToDo({ id, setError, token: admin?.token }).then((res) => {
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
                {todos.map(({ _id, body, date, pic, status }: ToDoTypes) => (
                  <div key={_id} className="toDoBlock">
                    <div className="toDoBlockInfo">
                      <div>body: {body}</div>
                      <div>
                        date: {moment(date).format("YYYY-MM-DD HH:mm:ss")}
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
                ))}
              </>
            ) : (
              <div>There are no ToDos yet</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { UserToDoMap };
