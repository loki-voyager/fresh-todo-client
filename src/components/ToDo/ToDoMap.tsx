import { ToDoTypes } from "../../types/ToDoTypes/ToDoTypes";
import { UserType } from "../../types/UserTypes/UserTypes";
import { ToDoOne } from "./ToDoOne";

type ToDoMapProps = {
  todos: ToDoTypes[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  ToDoGetHandler: (loading?: boolean) => Promise<void>
  user: UserType;
};

const ToDoMap = ({ todos, setError, ToDoGetHandler, user }: ToDoMapProps) => {
  return (
    <>
      {todos.map((todo: ToDoTypes) => (
        <ToDoOne
          todo={todo}
          key={todo._id}
          setError={setError}
          ToDoGetHandler={ToDoGetHandler}
          user={user}
        />
      ))}
    </>
  );
};

export { ToDoMap };
