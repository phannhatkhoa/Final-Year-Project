import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "customer" // Default role is "customer"
  );

  useEffect(() => {
    // Update localStorage whenever isAuthenticated or userRole changes
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("userRole", userRole);
  }, [isAuthenticated, userRole]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
