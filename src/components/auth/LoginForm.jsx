import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm({ onToggle }) {
  const { login, loginWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
    } catch (err) {
      setError("Identifiants invalides.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    try {
      await loginWithGoogle(credentialResponse.credential);
    } catch (err) {
      setError("Échec de connexion avec Google.");
    }
  };

  return (
    <div className="auth-container">
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
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="neon-btn" disabled={loading}>
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>

      <div style={{ margin: '1.5rem 0', textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', position: 'relative' }}>
        <span style={{ background: 'var(--bg-elevated)', padding: '0 0.5rem', zIndex: 1, position: 'relative' }}>ou continuer avec</span>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--muted)', opacity: 0.3 }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Erreur lors de la connexion Google.")}
          useOneTap
          theme="filled_blue"
          shape="pill"
        />
      </div>

      <div className="auth-subtext" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Pas de compte ?{" "}
        <span 
          style={{ color: 'var(--neon-blue)', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={onToggle}
        >
          Créer un compte
        </span>
      </div>
    </div>
  );
}
