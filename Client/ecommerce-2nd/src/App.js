import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/Login";
import RegisterTemplate from "./templates/RegisterTemplate";
import Register from "./Pages/Auth/Register/Register";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./Pages/HomePage/Home";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
