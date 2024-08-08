import { useSelector } from "react-redux";
import "../App.css";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { ToDoGet, ToDoGetResProps } from "../service/ToDo/ToDoGet";
import { useCallback, useEffect, useState } from "react";
import { ToDoTypes } from "../types/ToDoTypes/ToDoTypes";
import { ToDoForm } from "../components/ToDo/ToDoForm";
import { ToDoMap } from "../components/ToDo/ToDoMap";
import { Pagination } from "../components/Pagination";

function ToDo() {
  const user = useSelector((state: RootState) => state.user.data);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<ToDoTypes[]>();
  const [body, setBody] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();
  const [base64Codes, setBase64Codes] = useState<string[]>([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numOfPages, setNumOfPages] = useState(0);

  if (!user) {
    navigate("/");
  }

  const ToDoGetHandler = useCallback(
    async (loading?: boolean) => {
      if (user?._id) {
        setError("");
        loading && setLoading("Loading ToDo List");
        await ToDoGet({
          userId: user._id,
          token: user.token,
          setError,
          page,
          limit,
        }).then(({ todos, totalCount, pages }: ToDoGetResProps) => {
          if (page > pages) setPage(pages);
          setTodos(todos);
          setNumOfPages(pages);
          loading && setLoading("");
        });
      }
    },
    [limit, page, user?._id, user?.token]
  );

  useEffect(() => {
    ToDoGetHandler(true);
  }, [page, limit, ToDoGetHandler]);

  return (
    user && (
      <div className="wrapper ToDo">
        {error && <div>{error}</div>}
        <h1>ToDo</h1>
        <button
          className="btnGreen"
          onClick={() => {
            setOpenForm((state) => !state);
          }}
        >
          ToDo
        </button>
        {openForm && (
          <ToDoForm
            base64Codes={base64Codes}
            body={body}
            ToDoGetHandler={ToDoGetHandler}
            setBase64Codes={setBase64Codes}
            setBody={setBody}
            setError={setError}
            setOpenForm={setOpenForm}
            user={user}
          />
        )}
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
                <>
                  <ToDoMap
                    todos={todos}
                    setError={setError}
                    ToDoGetHandler={ToDoGetHandler}
                    user={user}
                  />
                </>
              ) : (
                <div>You don't have any ToDo's</div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
}

export default ToDo;
