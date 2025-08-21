import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export function ProtectedRoute({ children, anonymous = false }) {
  const { currentUser, loadingUser } = useContext(UserContext);
  const isLoggedIn = !!currentUser; // simpler check

  const location = useLocation();
  const from = location.state?.from || "/";

  if (loadingUser) {
    // You can swap this with a spinner UI later
    return <div>Loading...</div>;
  }

  if (anonymous && isLoggedIn) {
    // Logged in users shouldn’t see login/register pages
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isLoggedIn) {
    // Not logged in, redirect to landing
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

