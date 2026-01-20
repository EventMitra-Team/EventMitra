import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext(undefined);

export const AdminProvider = ({ children }) => {
  // 🔥 INITIAL STATE FROM LOCALSTORAGE
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("adminToken"));
  });

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:2511/api/admin/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      setIsAuthenticated(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
