import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard.jsx';
import RegisterForm from '../components/auth/RegisterForm.jsx';

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <AuthCard title="Inscription">
        <RegisterForm />
        <p className="auth-subtext">
          Déjà un compte ? <Link to="/login">Connexion</Link>
        </p>
      </AuthCard>
    </div>
  );
}
