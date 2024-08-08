import { useSelector } from "react-redux";
import "../App.css";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ToDoCompletedTypes } from "../types/ToDoTypes/ToDoTypes";
import {
  ToDoCompletedGet,
  ToDoCompletedGetResProps,
} from "../service/ToDo/ToDoCompletedGet";
import { ToDoCompletedMap } from "../components/ToDo/ToDoCompletedMap";
import { Pagination } from "../components/Pagination";

function ToDoCompleted() {
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [todos, setTodos] = useState<ToDoCompletedTypes[]>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);

  if (!user) {
    navigate("/");
  }

  const ToDoCompletedGetHandler = useCallback(
    async (loading?: boolean) => {
      if (user?._id) {
        setError("");
        if (loading) setLoading("Loading ToDo List");
        await ToDoCompletedGet({
          userId: user._id,
          token: user.token,
          setError,
          page,
          limit,
        }).then(
          async ({ pages, todos, totalCount }: ToDoCompletedGetResProps) => {
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
    ToDoCompletedGetHandler(true);
  }, [page, limit, ToDoCompletedGetHandler]);

  return (
    user && (
      <div className="wrapper ToDo">
        {error && <div>{error}</div>}
        <h1>ToDoCompleted</h1>
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
                <ToDoCompletedMap
                  setError={setError}
                  user={user}
                  todos={todos}
                  ToDoCompletedGetHandler={ToDoCompletedGetHandler}
                />
              ) : (
                <div>You don't have any Completed ToDo's</div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
}

export default ToDoCompleted;
