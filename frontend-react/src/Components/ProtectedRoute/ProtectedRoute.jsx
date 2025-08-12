import { Navigate, useLocation } from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../contexts/userContext";

export function ProtectedRoute({ children, anonymous = false }) {
  const {currentUser, loadingUser} = useContext(UserContext);
  const isLoggedIn = !!currentUser?.username;

  const location = useLocation();
  const from = location.state?.from || "/";
  
  if(loadingUser) {
    return null;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }
  return children;
}
