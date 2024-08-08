import moment from "moment";
import { ToDoDeletedTypes } from "../../types/ToDoTypes/ToDoTypes";
import { UserType } from "../../types/UserTypes/UserTypes";
import { Base64Pic } from "../Pic/Base64Pic";
import { ToDoDeleteFull } from "../../service/ToDo/ToDoDeleteFull";
import { ToDoDeletedReturn } from "../../service/ToDo/ToDoDeletedReturn";

type ToDoCompletedMapProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
  user: UserType;
  todos: ToDoDeletedTypes[];
  ToDoDeletedGetHandler: (loading?: boolean) => Promise<void>;
};

const ToDoDeletedMap = ({
  setError,
  user,
  todos,
  ToDoDeletedGetHandler,
}: ToDoCompletedMapProps) => {

  const ToDoRepeatHandler = async ({ id }: { id: string }) => {
    setError("")
    await ToDoDeletedReturn({ id, setError, token: user.token }).then(
      async (res) => {
        if (res) {
          await ToDoDeletedGetHandler(true);
        }
      }
    );
  };
  const ToDoDeleteHandler = async ({ id }: { id: string }) => {
    setError("")
    await ToDoDeleteFull({ id, setError, token: user.token }).then(
      async (res) => {
        if (res) {
          await ToDoDeletedGetHandler(true);
        }
      }
    );
  };
  return (
      <>
        {todos.map(
          ({
            _id,
            body,
            generated,
            pic,
            status,
            deleted,
          }: ToDoDeletedTypes) => (
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
                  deleted: {moment(deleted).format("YYYY-MM-DD HH:mm:ss")}
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
                  Delete Full
                </button>
              </div>
            </div>
          )
        )}
      </>
  );
};

export { ToDoDeletedMap };
