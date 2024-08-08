const SignOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("UserSignUp")
  window.location.reload();
  return null;
};

export { SignOut };
