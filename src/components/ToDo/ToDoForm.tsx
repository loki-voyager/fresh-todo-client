import { useRef } from "react";
import { AutoResizeTextarea } from "../AutoResizeTextarea";
import { Base64ArrayModifier } from "../Pic/Base64ArrayModifier";
import { UserType } from "../../types/UserTypes/UserTypes";
import { ToDoPost } from "../../service/ToDo/ToDoPost";

type ToDoFormProps = {
  user: UserType;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  base64Codes: string[];
  setBase64Codes: React.Dispatch<React.SetStateAction<string[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  ToDoGetHandler: (loading?: boolean, page?: number, limit?: number) => Promise<void>
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToDoForm = ({
  body,
  user,
  setBody,
  base64Codes,
  setBase64Codes,
  setError,
  ToDoGetHandler,
  setOpenForm,
}: ToDoFormProps) => {
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
          if (newBase64Codes.length === files.length) {
            setBase64Codes(newBase64Codes);
          }
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
    setError("")
    if (user) {
      await ToDoPost({
        token: user.token,
        body,
        pic: base64Codes,
        setError,
      }).then(async (res) => {
        if (res) {
          await ToDoGetHandler(true).then(async (res) => {
            setBody("");
            setOpenForm((state) => !state);
            setBase64Codes([]);
          });
        }
      });
    }
  };

  return (
    <div className="toDoFormBlock">
      <form
        className="toDoForm"
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
        <button className="btnGreen">CreateToDo</button>
      </form>
      <Base64ArrayModifier
        base64Codes={base64Codes}
        setBase64Codes={setBase64Codes}
      />
    </div>
  );
};

export { ToDoForm };
