import { useRef, useState } from "react";
import { ToDoTypes } from "../../types/ToDoTypes/ToDoTypes";
import { AutoResizeTextarea } from "../AutoResizeTextarea";
import { Base64ArrayModifier } from "../Pic/Base64ArrayModifier";
import { ToDoEdit } from "../../service/ToDo/ToDoEdit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ToDoOneFormEdit = ({
  todo,
  setError,
  setEdit,
  ToDoGetHandler,
  setLoading,
}: {
  todo: ToDoTypes;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  ToDoGetHandler: (
    loading?: boolean,
    page?: number,
    limit?: number
  ) => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { _id, body: oldBody, pic } = todo;
  const user = useSelector((state: RootState) => state.user.data);

  const [base64Codes, setBase64Codes] = useState(pic);
  const [body, setBody] = useState(oldBody);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newBase64Codes: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          newBase64Codes.push(base64);
          setBase64Codes([...base64Codes, ...newBase64Codes]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (user) {
      setEdit((state) => !state);
      setLoading("Edit ToDo");
      await ToDoEdit({
        id: _id,
        body,
        pic: base64Codes,
        setError,
        token: user?.token,
      }).then(async (res) => {
        if (res) {
          setBody("");
          setBase64Codes([]);
          setLoading("");
          ToDoGetHandler();
        }
      });
    }
  };

  return (
    <div className="toDoBlockInfo">
      <form
        className="toDoForm"
        id="signupForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <AutoResizeTextarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter ToDo"
          required
        />
        <div className="inputFileBlock">
          <input
            type="file"
            name="pic"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple
          />
          <button
            onClick={(e) => {
              handleButtonClick(e);
            }}
          >
            Choose File
          </button>
        </div>
        <button className="btnGreen">Edit ToDo</button>
      </form>
      <Base64ArrayModifier
        base64Codes={base64Codes}
        setBase64Codes={setBase64Codes}
      />
    </div>
  );
};

export { ToDoOneFormEdit };
