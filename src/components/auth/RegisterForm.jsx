import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RegisterForm({ onToggle }) {
  const { register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await register({ email, password });
    } catch (err) {
      setError("Erreur lors de l'inscription. L'utilisateur existe peut-être déjà.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-label">
        Email
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="auth-label">
        Mot de passe
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="auth-label">
        Confirmer le mot de passe
        <input
          type="password"
          className="auth-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      {error && <div className="auth-error">{error}</div>}
      <button type="submit" className="neon-btn" disabled={loading}>
        {loading ? "Chargement..." : "S'inscrire"}
      </button>
      <div className="auth-subtext">
        Déjà un compte ?{" "}
        <span 
          style={{ color: 'var(--neon-blue)', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={onToggle}
        >
          Se connecter
        </span>
      </div>
    </form>
  );
}
