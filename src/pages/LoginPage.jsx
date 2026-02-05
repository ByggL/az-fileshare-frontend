import React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";
import { useNavigate } from "react-router-dom";

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
