import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

/**all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/Password",
    element: <Password></Password>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>
  },
  {
    path: "/reset",
    element: <Reset></Reset>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
]);

function App() {
  return (
    // <div className="App">
    //   <div className="container">
    //     <Register />
    //     {/* <Login /> */}
    //   </div>
    // </div>
    <main>
      <RouterProvider router={router}>
      </RouterProvider>
    </main>
  );
}

export default App;
