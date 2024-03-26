import * as React from "react";
import { RouterProvider } from "react-router-dom";
import useRoutesElements from "./useRoutesElements";

function App() {
  const router = useRoutesElements();
  return (
    <RouterProvider router={router} />
  );
}

export default App;