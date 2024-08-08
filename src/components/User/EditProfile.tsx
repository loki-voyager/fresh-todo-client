import { useEffect, useRef, useState } from "react";
import { ProfileProps } from "./Profile";
import { Base64ArrayModifier } from "../Pic/Base64ArrayModifier";
import { TakeUserPic } from "../../function/User/TakeUserPic";
import { EditUserType, UserEdit } from "../../service/User/UserEdit";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ userState, setError, setEdit }: ProfileProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [base64Codes, setBase64Codes] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState) {
      TakeUserPic({
        username: userState.username,
        token: userState.token,
        setPic: setBase64Codes,
        setError,
      });
    }
  }, [userState, setError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const user: EditUserType = {
        oldUsername: userState.username,
        email: email.length > 0 ? email : userState.email,
        username: username.length > 0 ? username : userState.username,
        password,
        pic: base64Codes,
      };
      await UserEdit({ user, token: userState.token, setError }).then((res) => {
        if (res) {
          navigate(0);
        }
      });
    } catch (error) {
      console.error({ error });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ) => {
    set(event.target.value);
  };

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="SignUp">
      <h1>EditProfile</h1>
      <form
        className="form"
        id="signupForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="username"
          id="username"
          placeholder={userState.username}
          onChange={(e) => {
            handleInputChange(e, setUsername);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="old password    *required*"
          onChange={(e) => {
            handleInputChange(e, setPassword);
          }}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            handleInputChange(e, setPassword);
          }}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder={userState.email}
          onChange={(e) => {
            handleInputChange(e, setEmail);
          }}
        />
        <div className="inputFileBlock">
          <input
            type="file"
            name="pic"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            onClick={(e) => {
              handleButtonClick(e);
            }}
          >
            Choose File
          </button>
        </div>
        <button type="submit" className="btnGreen">
          Edit
        </button>
      </form>
      <button
        className="btnRed"
        onClick={() => {
          setEdit((state) => !state);
        }}
      >
        Cancel
      </button>
      <Base64ArrayModifier
        base64Codes={base64Codes}
        setBase64Codes={setBase64Codes}
        permission
      />
    </div>
  );
};

export { EditProfile };
