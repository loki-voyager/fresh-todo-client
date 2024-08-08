import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="wrapper">
      <div className="NotFound">
        <h1>Page Not Found {":<"}</h1>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
