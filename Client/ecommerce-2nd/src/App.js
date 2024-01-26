import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <div className="App">
      <div className="container">
        <Register />
        {/* <Login /> */}
      </div>
    </div>
  );
}

export default App;
