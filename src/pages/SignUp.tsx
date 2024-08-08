import { useRef, useState } from "react";
import "../App.css";
import { Base64ArrayModifier } from "../components/Pic/Base64ArrayModifier";
import { useNavigate } from "react-router-dom";
import { UserSignUpType } from "../types/UserTypes/UserSignUpType";
import { UserChechExist } from "../service/Auth/UserChechExist";
import { UserCreateVerification } from "../service/Auth/UserCreateVerification";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [base64Codes, setBase64Codes] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    await UserChechExist({ username, email, setError }).then(async (exist) => {
      if (exist != undefined && !exist) {
        await UserCreateVerification({ username, email, setError }).then(
          (token) => {
            const UserSignUp: UserSignUpType = {
              username,
              email,
              password,
              base64Codes,
              token,
            };
            localStorage.setItem("UserSignUp", JSON.stringify(UserSignUp));
            if (token != undefined && token) {
              navigate("/Verification");
            }
          }
        );
      }
    });
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
          if (newBase64Codes.length === files.length) {
            setBase64Codes(newBase64Codes);
          }
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
    <div className="wrapper SignUp">
      <h1>SignUp</h1>
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
          placeholder="username"
          onChange={(e) => {
            handleInputChange(e, setUsername);
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
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={(e) => {
            handleInputChange(e, setEmail);
          }}
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
          Sign Up
        </button>
      </form>
      <Base64ArrayModifier
        base64Codes={base64Codes}
        setBase64Codes={setBase64Codes}
      />
      {error && <div>{error}</div>}
    </div>
  );
}

export default SignUp;
