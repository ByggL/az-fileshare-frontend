import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, googleLogin } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("azfs_token"),
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const handleAuthSuccess = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("azfs_token", newToken);
    navigate("/");
  };

  const login = async (creds) => {
    setLoading(true);
    try {
      const data = await loginUser(creds);
      handleAuthSuccess(data.token);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (googleToken) => {
    setLoading(true);
    try {
      const data = await googleLogin(googleToken);
      handleAuthSuccess(data.token);
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

  const value = { token, isAuthenticated, loading, login, loginWithGoogle, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
