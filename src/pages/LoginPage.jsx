import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';

export default function LoginPage() {
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
