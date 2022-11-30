import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const UserRoute = () => {
  return isAuthenticated() && isAuthenticated().role === 0 ? (
    <Outlet />
  ) : (
    <Navigate replace to="/signin" />
  );
};

export default UserRoute;
