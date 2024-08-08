import { useEffect, useState } from "react";
import { UserSignUpType } from "../types/UserTypes/UserSignUpType";
import { UserVerification } from "../service/Auth/UserVerification";
import { SignUpFetch } from "../service/Auth/SignUpFetch";
import { SignInFetch } from "../service/Auth/SignInFetch";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveUser } from "../store/UserSlice";

const Verification = () => {
  const [error, setError] = useState("");
  const [verification, serVerification] = useState("");
  const [userSignUp, setUserSignUp] = useState<UserSignUpType>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const buff = localStorage.getItem("UserSignUp");
    if (buff) {
      setUserSignUp(JSON.parse(buff));
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      if (userSignUp != undefined && userSignUp && verification) {
        await UserVerification({
          username: userSignUp.username,
          email: userSignUp.email,
          code: verification,
          token: userSignUp.token,
          setError,
        }).then(async (token) => {
          if (token && token != undefined) {
            setError("");
            await SignUpFetch({
              username: userSignUp.username,
              email: userSignUp.email,
              password: userSignUp.password,
              pic: userSignUp.base64Codes,
              token,
              setError,
            }).then(async (user) => {
              if (user && user != undefined) {
                setError("");
                await SignInFetch({
                  data: userSignUp.username,
                  password: userSignUp.password,
                  setError,
                }).then((user) => {
                  if (user) {
                    dispatch(SaveUser(user));
                    navigate("/");
                  }
                });
              }
            });
          }
        });
      }
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

  return (
    <div className="wrapper SignUp">
      <h1>Email Verification, enter code from email: {userSignUp?.email}</h1>
      <h2>Until you do this, the account will not be created.</h2>
      <form
        className="form"
        id="signupForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            handleInputChange(e, serVerification);
          }}
          required
        />
        <button className="btnGreen">Verificate</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};
export { Verification };
