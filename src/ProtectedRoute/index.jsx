import React from "react";
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userProfile = useSelector((state) => state.user?.profile);
  if (userProfile === null) {
    return <Navigate to={'/login'}/>;
  }else{
    return <Outlet/>
  }
};

export default ProtectedRoute;
