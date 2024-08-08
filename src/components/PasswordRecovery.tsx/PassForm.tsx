import { useEffect, useState } from "react";
import { UserPasswordRecovery } from "../../service/Auth/UserPasswordRecovery";
import { UserType } from "../../types/UserTypes/UserTypes";
import { SignInFetch } from "../../service/Auth/SignInFetch";

type EmailFormProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  token: string;
};

const PassForm = ({ setError, email, token }: EmailFormProps) => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [chechPass1, setChechPass1] = useState("");
  const [chechPass2, setChechPass2] = useState("");
  const [unlock, setUnlock] = useState(false);

  useEffect(() => {
    if (
      chechPass1 === chechPass2 &&
      chechPass1.length > 0 &&
      chechPass2.length > 0
    ) {
      setPassword(chechPass1);
      setUnlock(true);
    }
  }, [setChechPass1, setChechPass2, chechPass1, chechPass2]);

  const emailEnterFormHandleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    try {
      await UserPasswordRecovery({
        email,
        password,
        code,
        setError,
        token,
      }).then(async (user: UserType) => {
        if (user) {
          const { username, email } = user;
          setError("")
          await SignInFetch({ data: username, password, setError });
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
  return (
    <>
      <form
        className="form"
        id="emailEnterForm"
        onSubmit={(e) => {
          emailEnterFormHandleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="code"
          onChange={(e) => {
            handleInputChange(e, setCode);
          }}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            handleInputChange(e, setChechPass1);
          }}
          required
        />
        <input
          type="password"
          placeholder="repeat password"
          onChange={(e) => {
            handleInputChange(e, setChechPass2);
          }}
          required
        />
        {unlock &&
        code.length > 0 &&
        chechPass1.length > 0 &&
        chechPass2.length > 0 ? (
          <button className="btnGreen">Recovery</button>
        ) : (
          <button className="btnDisabled" disabled>
            Password mismatch
          </button>
        )}
      </form>
    </>
  );
};
export { PassForm };
