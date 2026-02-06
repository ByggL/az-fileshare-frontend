import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("azfs_token"),
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const login = async (creds) => {
    setLoading(true);
    try {
      const data = await loginUser(creds);
      const newToken = data.token;
      setToken(newToken);
      window.localStorage.setItem("azfs_token", newToken);
      console.log(window.APP_CONFIG?.API_URL);
      const token = window.localStorage.getItem("azfs_token");
      console.log(token);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    setLoading(true);
    try {
      await registerUser(form);
      await login(form);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("azfs_token");
    navigate("/login");
  };

  useEffect(() => {
    // placeholder pour future vérification de token
  }, []);

  const value = { token, isAuthenticated, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
