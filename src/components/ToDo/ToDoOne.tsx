import moment from "moment";
import { Base64Pic } from "../Pic/Base64Pic";
import { useState } from "react";
import { ToDoTypes } from "../../types/ToDoTypes/ToDoTypes";
import { ToDoOneFormEdit } from "./ToDoOneFormEdit";
import { ToDoDelete } from "../../service/ToDo/ToDoDelete";
import { UserType } from "../../types/UserTypes/UserTypes";
import { ToDoComplete } from "../../service/ToDo/ToDoComplete";

type ToDoOneProps = {
  todo: ToDoTypes;
  setError: React.Dispatch<React.SetStateAction<string>>;
  ToDoGetHandler: (loading?: boolean) => Promise<void>
  user: UserType;
};

const ToDoOne = ({ todo, setError, ToDoGetHandler, user }: ToDoOneProps) => {
  const { _id, body, date, pic, status } = todo;
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState("");
  const ToDoEditHandler = async () => {
    setEdit((state) => !state);
  };
  const ToDoDoneHandler = async () => {
    setError("")
    await ToDoComplete({ id: _id, setError, token: user.token }).then(
      async (res) => {
        if (res) {
          await ToDoGetHandler(true);
        }
      }
    );
  };
  const ToDoDeleteHandler = async () => {
    setError("")
    await ToDoDelete({ id: _id, setError, token: user.token }).then(
      async (res) => {
        if (res) {
          await ToDoGetHandler(true);
        }
      }
    );
  };

  return (
    <div key={_id} className={edit ? "toDoBlockEdit" : "toDoBlock"}>
      {loading ? (
        <>
          <div className="toDoBlockInfo">{loading}</div>
        </>
      ) : (
        <>
          {edit ? (
            <ToDoOneFormEdit
              todo={todo}
              setError={setError}
              setEdit={setEdit}
              ToDoGetHandler={ToDoGetHandler}
              setLoading={setLoading}
            />
          ) : (
            <div className="toDoBlockInfo">
              <div>body: {body}</div>
              <div> date: {moment(date).format("YYYY-MM-DD HH:mm:ss")}</div>
              <div>status: {status}</div>
              <Base64Pic base64Codes={pic} />
            </div>
          )}
        </>
      )}
      <div className="toDoBtnBlock">
        <button
          className="btnGreen"
          onClick={() => {
            ToDoEditHandler();
          }}
        >
          Edit
        </button>
        <button
          className="btnGreen"
          onClick={() => {
            ToDoDoneHandler();
          }}
        >
          Done
        </button>
        <button
          className="btnRed"
          onClick={() => {
            ToDoDeleteHandler();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export { ToDoOne };
