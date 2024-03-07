import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import RegisterTemplate from "./templates/RegisterTemplate";
import Register from "./Pages/Auth/Register/Register";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./Pages/HomePage/Home";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomeTemplate>
          <Home/>
        </HomeTemplate>} />

        <Route path="/login" element={<RegisterTemplate>
          <Login/>
        </RegisterTemplate>} />

        <Route path="/register" 
        element={<RegisterTemplate><Register/></RegisterTemplate>} />
      </Routes>
    </Router>
  );
}

export default App;
