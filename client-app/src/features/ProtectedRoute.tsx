import React, { useContext } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootStoreContext } from "../stores/rootStore";

const ProtectedRoute = () => {
  const rootStore = useContext(RootStoreContext);

  const { isLoggedIn, user } = rootStore.userStore;

  let location = useLocation();

  if (!isLoggedIn) {
    console.log("User not logged in, redirecting to /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
