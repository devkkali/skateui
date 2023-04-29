// PrivateRoute.tsx in v6
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';


const PublicRoute = ({ children } ) => {
  let location = useLocation();

  if (localStorage.getItem('token')) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;