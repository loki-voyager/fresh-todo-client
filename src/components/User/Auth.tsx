import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");

  return (
    <div className="wrapper">
      <div className="Auth">
        <button
          className="btnGreen"
          onClick={() => {
            setLoading("Loading...");
            navigate("/SignUp");
          }}
        >
          SignUp
        </button>
        <button
          className="btnGreen"
          onClick={() => {
            setLoading("Loading...");
            navigate("/SignIn");
          }}
        >
          SignIn
        </button>
      </div>
      {loading && <div>{loading}</div>}
    </div>
  );
}

export default Auth;
