import moment from "moment";
import { ToDoCompletedTypes } from "../../types/ToDoTypes/ToDoTypes";
import { UserType } from "../../types/UserTypes/UserTypes";
import { Base64Pic } from "../Pic/Base64Pic";
import { ToDoCompletedReturn } from "../../service/ToDo/ToDoCompletedReturn";
import { ToDoDeleteCompleted } from "../../service/ToDo/ToDoDeleteCompleted";

type ToDoCompletedMapProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
  user: UserType;
  todos: ToDoCompletedTypes[];
  ToDoCompletedGetHandler: (loading?: boolean) => Promise<void>
};

const ToDoCompletedMap = ({
  setError,
  user,
  todos,
  ToDoCompletedGetHandler,
}: ToDoCompletedMapProps) => {
  const ToDoRepeatHandler = async ({ id }: { id: string }) => {
    setError("")
    await ToDoCompletedReturn({ id, setError, token: user.token }).then(
      async (res) => {
        if (res) {
          await ToDoCompletedGetHandler(true);
        }
      }
    );
  };
  const ToDoDeleteHandler = async ({ id }: { id: string }) => {
    setError("")
    await ToDoDeleteCompleted({ id, setError, token: user.token }).then(async (res) => {
      if (res) {
        await ToDoCompletedGetHandler(true);
      }
    });
  };
  return (
    <>
      {todos.map(
        ({
          _id,
          body,
          completed,
          generated,
          pic,
          status,
        }: ToDoCompletedTypes) => (
          <div className="toDoBlock" key={_id}>
            <div className="toDoBlockInfo">
              <div>body: {body}</div>
              <div>status: {status}</div>
              <div>
                {" "}
                generated: {moment(generated).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <div>
                {" "}
                completed: {moment(completed).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <Base64Pic base64Codes={pic} />
            </div>
            <div className="toDoBtnBlock">
              <button
                className="btnGreen"
                onClick={() => {
                  ToDoRepeatHandler({ id: _id });
                }}
              >
                Return
              </button>
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
  );
};

export { ToDoCompletedMap };
