import { UserCreatePasswordRecovery } from "../../service/Auth/UserCreatePasswordRecovery";

type EmailFormProps = {
  setShowPassForm: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setToken: React.Dispatch<React.SetStateAction<string>>
};

const EmailForm = ({
  setShowPassForm,
  setError,
  setEmail,
  email,
  setToken
}: EmailFormProps) => {
  const emailEnterFormHandleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    try {
      await UserCreatePasswordRecovery({ email, setError }).then((token) => {
        if (token) {
          setToken(token)
          setShowPassForm((state) => !state);
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
          placeholder="email"
          onChange={(e) => {
            handleInputChange(e, setEmail);
          }}
          required
        />
        <button className="btnGreen">Send Email</button>
      </form>
    </>
  );
};
export { EmailForm };
