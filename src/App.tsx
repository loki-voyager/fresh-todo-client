import { Route, Routes } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthFromLocal } from "./service/AuthFromLocal";
import { SaveUser } from "./store/UserSlice";
import { Header } from "./components/Header/Header";
import AppError from "./components/AppError";
import Home from "./pages/Home";
import ToDo from "./pages/ToDo";
import ToDoDeleted from "./pages/ToDoDeleted";
import ToDoCompleted from "./pages/ToDoCompleted";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Verification } from "./pages/Verification";
import { PasswordRecovery } from "./pages/PasswordRecovery";
import UserProfileAdmin from "./pages/UserProfileAdmin";
import NotFound from "./pages/NotFound";
import UserMap from "./pages/UserMap";
import React from "react";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  async function start() {
    const user = await AuthFromLocal({ setError });
    if (user) {
      dispatch(SaveUser(user));
    }
    setLoading(false);
  }

  useEffect(() => {
    start();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="wrapper">
            <h1>Loading...</h1>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <AppError error={error} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ToDo" element={<ToDo />} />
          <Route path="/ToDoDeleted" element={<ToDoDeleted />} />
          <Route path="/ToDoCompleted" element={<ToDoCompleted />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/UserMap" element={<UserMap />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
          <Route path="/UserProfileAdmin/:id" element={<UserProfileAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
