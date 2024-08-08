import { useSelector } from "react-redux";
import "../App.css";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ToDoDeletedTypes } from "../types/ToDoTypes/ToDoTypes";
import {
  ToDoDeletedGet,
  ToDoDeletedGetResProps,
} from "../service/ToDo/ToDoDeletedGet";
import { ToDoDeletedMap } from "../components/ToDo/ToDoDeletedMap";
import { Pagination } from "../components/Pagination";

function ToDoDeleted() {
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [todos, setTodos] = useState<ToDoDeletedTypes[]>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);

  if (!user) {
    navigate("/");
  }

  const ToDoDeletedGetHandler = useCallback(
    async (loading?: boolean) => {
      if (user?._id) {
        setError("");
        if (loading) setLoading("Loading ToDo List");
        await ToDoDeletedGet({
          userId: user._id,
          token: user.token,
          setError,
          page,
          limit,
        }).then(
          async ({ todos, pages, totalCount }: ToDoDeletedGetResProps) => {
            if (page > pages) setPage(pages);
            setTodos(todos);
            setNumOfPages(pages);
            loading && setLoading("");
          }
        );
      }
    },
    [limit, page, user?._id, user?.token]
  );

  useEffect(() => {
    ToDoDeletedGetHandler(true);
  }, [page, limit, ToDoDeletedGetHandler]);

  return (
    user && (
      <div className="wrapper ToDo">
        {error && <div>{error}</div>}
        <h1>ToDoDeleted</h1>
        <Pagination
          numOfPages={numOfPages}
          setPage={setPage}
          currentPage={page}
          setLimit={setLimit}
          limit={limit}
        />
        <div className="toDoWrapper">
          {loading ? (
            <>{loading}</>
          ) : (
            <>
              {todos && todos?.length > 0 ? (
                <ToDoDeletedMap
                  setError={setError}
                  user={user}
                  todos={todos}
                  ToDoDeletedGetHandler={ToDoDeletedGetHandler}
                />
              ) : (
                <div>You don't have any Deleted ToDo's</div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
}

export default ToDoDeleted;
