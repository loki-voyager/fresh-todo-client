import { useState } from "react";
import "../App.css";
import { SignInFetch } from "../service/Auth/SignInFetch";
import { useDispatch } from "react-redux";
import { SaveUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    await SignInFetch({ data: data, password: password, setError }).then(
      (user) => {
        if (user) {
          dispatch(SaveUser(user));
          navigate("/");
        }
      }
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ) => {
    set(event.target.value);
  };

  return (
    <div className="wrapper SignUp">
      <h1>SignIn</h1>
      <form
        className="form"
        id="signupForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="data"
          id="data"
          placeholder="username or email"
          onChange={(e) => {
            handleInputChange(e, setData);
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
        <button type="submit" className="btnGreen">
          Sign In
        </button>
      </form>
      <a href="/PasswordRecovery" className="link">
        password recovery
      </a>
      {error && <div>{error}</div>}
    </div>
  );
}

export default SignIn;
