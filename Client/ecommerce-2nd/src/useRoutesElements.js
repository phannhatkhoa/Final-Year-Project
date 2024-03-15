import React, { useContext } from 'react';
import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthProvider';
import { HomeTemplate } from './templates/HomeTemplate';
import { RegisterTemplate } from './templates/RegisterTemplate';
import { Home } from './Pages/HomePage/Home';
import Login from './Pages/Auth/Login/Login';
import { Register } from './Pages/Auth/Register/Register'; // Import as named export

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

const RejectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default function useRoutesElements() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [{ path: '/', element: <HomeTemplate><Home /></HomeTemplate> }]
    },
    {
      path: '/',
      element: <RejectedRoutes />,
      children: [
        { path: 'signin', element: <RegisterTemplate><Login /></RegisterTemplate> },
        { path: 'signup', element: <RegisterTemplate><Register /></RegisterTemplate> }
      ]
    },
  ]);
  return router;
}
