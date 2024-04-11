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
import WelcomePage from './Pages/Welcome/Welcome';
import { UserPage } from './Pages/Auth/Admin/DisplayUser';
import { AdminTemplate } from './templates/AdminTemplate';
import { DisplayProduct } from './Pages/Auth/Admin/DisplayProduct';
import AboutUs from './Pages/Welcome/AboutUs';
import { Phone } from './Pages/HomePage/Phone';
import { Tablet } from './Pages/HomePage/Tablet';
import { Laptop } from './Pages/HomePage/Laptop';
import { PhoneTemplate } from './templates/PhoneTemplate';
import { TabletTemplate } from './templates/TabletTemplate';
import { LaptopTemplate } from './templates/LaptopTemplate';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/user/signin" />;
};

const RejectedRoutes = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  // Check if user is authenticated and has admin role to access rejected routes
  return isAuthenticated && userRole === 'admin' ? <Outlet /> : <Navigate to="/home" />;
};

export default function useRoutesElements() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '', element: <WelcomePage /> },
        { path: 'user/signin', element: <RegisterTemplate><Login /></RegisterTemplate> },
        { path: 'user/signup', element: <RegisterTemplate><Register /></RegisterTemplate> },
        { path: 'home', element: <HomeTemplate><Home /></HomeTemplate> },
        { path: `/product/getProduct/:productId`, element: <ProductDetailTemplate> <ProductDetail /> </ProductDetailTemplate> },
        { path: 'aboutUs', element: <HomeTemplate><AboutUs /></HomeTemplate> },
        { path: 'phone', element: <PhoneTemplate><Phone /></PhoneTemplate> },
        { path: 'tablet', element: <TabletTemplate><Tablet /></TabletTemplate> },
        { path: 'laptop', element: <LaptopTemplate><Laptop /></LaptopTemplate> }
      ]
    },
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        { path: 'user/profile', element: <ProfileTemplate><Profile /></ProfileTemplate> },
        { path: `cart/getCart/:user_id`, element: <CartTemplate><ShoppingCart /></CartTemplate> },
        { path: 'payment', element: <PaymentTemplate><Payment /></PaymentTemplate> },

      ]
    },
    {
      path: '/',
      element: <RejectedRoutes />,
      children: [
        { path: 'admin/getUser', element: <AdminTemplate><UserPage /></AdminTemplate> },
        { path: 'admin/getProducts', element: <AdminTemplate><DisplayProduct /></AdminTemplate> }
      ]
    }
  ]);
  return router;
}
