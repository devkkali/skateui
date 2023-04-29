// PrivateRoute.tsx in v6
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';
import AccessDenied from '../screens/AccessDenied';
import { clearAuthState, fetchUserBytoken, userAuth } from './authSlice';
// import { ROLE } from '../helpers/roles';


const PrivateRoute = ({ children, roles, ...rest }) => {
  let location = useLocation();
  const { name, email, isFetching, isSuccess, isError, errorMessage, role, status, isAuthenticated, } = useSelector(userAuth)
  const userHasRequiredRole = role && roles.includes(role) ? true : false;
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(clearAuthState());
  //     navigate('/login');
  //   }
  // }, [isError]);

  if (!isAuthenticated) {
    if (status === 'rejected') {
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return (
      <div className="body-center container screen-centered">
        <p>Checking authenticaton..</p>
      </div>
    );
  }

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (localStorage.getItem('token') && !userHasRequiredRole) {
    return <AccessDenied />;
  }
  return children;
};

export default PrivateRoute;