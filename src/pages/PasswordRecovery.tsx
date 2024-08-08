import { useState } from "react";
import { EmailForm } from "../components/PasswordRecovery.tsx/EmailForm";
import { PassForm } from "../components/PasswordRecovery.tsx/PassForm";

const PasswordRecovery = () => {
  const [error, setError] = useState("");
  const [showPassForm, setShowPassForm] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="wrapper SignUp">
      <h1>Password recovery</h1>
      {showPassForm ? (
        <>
          <PassForm email={email} setError={setError} token={token} />
        </>
      ) : (
        <EmailForm
          setShowPassForm={setShowPassForm}
          setError={setError}
          setEmail={setEmail}
          setToken={setToken}
          email={email}
        />
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export { PasswordRecovery };
