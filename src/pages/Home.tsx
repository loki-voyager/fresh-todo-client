import "../App.css";
import { useSelector } from "react-redux";
import Auth from "../components/User/Auth";
import { RootState } from "../store";
import { Profile } from "../components/User/Profile";
import { useState } from "react";
import { EditProfile } from "../components/User/EditProfile";

function Home() {
  const userState = useSelector((state: RootState) => state.user.data);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="wrapper">
      {!userState ? (
        <Auth />
      ) : (
        <>
          {edit ? (
            <EditProfile
              userState={userState}
              setError={setError}
              setEdit={setEdit}
            />
          ) : (
            <Profile
              userState={userState}
              setError={setError}
              setEdit={setEdit}
            />
          )}
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

export default Home;
