import { NavigateFunction } from "react-router-dom";

const handleLogout = (navigate: NavigateFunction) => {
  localStorage.removeItem("authToken");
  sessionStorage.clear();

  navigate("/signin");
};

export default handleLogout;
