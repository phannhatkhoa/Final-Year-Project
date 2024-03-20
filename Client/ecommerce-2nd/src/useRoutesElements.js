import React, { useContext } from 'react';
import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthProvider';
import { HomeTemplate } from './templates/HomeTemplate';
import { RegisterTemplate } from './templates/RegisterTemplate';
import { ProfileTemplate } from './templates/ProfileTemplate';
import { Home } from './Pages/HomePage/Home';
import Login from './Pages/Auth/Login/Login';
import { Register } from './Pages/Auth/Register/Register';
import Profile from './Pages/Auth/Profile/Profile';
import { ProductDetailTemplate } from './templates/ProductDetailTemplate';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import { CartTemplate } from './templates/CartTemplate';
import ShoppingCart from './Pages/Cart/Cart';
import { PaymentTemplate } from './templates/PaymentTemplate';
import Payment from './Pages/Payment/Payment';

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
      children: [
        { path: '/', element: <HomeTemplate><Home /></HomeTemplate> },
        { path: 'profile', element: <ProfileTemplate><Profile /></ProfileTemplate> },
        { path: 'product', element: <ProductDetailTemplate><ProductDetail /></ProductDetailTemplate>},
        {path: 'cart', element: <CartTemplate><ShoppingCart /></CartTemplate>},
        {path:'payment', element: <PaymentTemplate><Payment/></PaymentTemplate>},
      ]
    },
    {
      path: '/',
      element: <RejectedRoutes />,
      children: [
        { path: 'signin', element: <RegisterTemplate><Login /></RegisterTemplate> },
        { path: 'signup', element: <RegisterTemplate><Register /></RegisterTemplate> }
      ]
    }
  ]);
  return router;
}
