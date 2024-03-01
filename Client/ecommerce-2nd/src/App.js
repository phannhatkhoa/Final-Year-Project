import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import RegisterTemplate from "./templates/RegisterTemplate";
import Register from "./Pages/Auth/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
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
