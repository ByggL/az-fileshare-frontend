import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthCard from "../components/auth/AuthCard.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="auth-page">
      <AuthCard title="Connexion">
        <LoginForm />
        <p className="auth-subtext">
          Pas encore de compte ? <Link to="/register">Inscription</Link>
        </p>
      </AuthCard>
    </div>
  );
}
