import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const { loginWithGoogle, loading } = useAuth();
  const [error, setError] = useState("");

  const handleSuccess = async (credentialResponse) => {
    setError("");
    try {
      await loginWithGoogle(credentialResponse.credential);
    } catch (err) {
      setError("Échec de connexion avec Google.");
      console.error(err);
    }
  };

  const handleError = () => {
    setError("Erreur lors de la connexion Google.");
  };

  return (
    <div className="auth-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1rem' }}>Connexion</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        shape="pill"
      />
      {error && <div className="auth-error" style={{ marginTop: '1rem' }}>{error}</div>}
      {loading && <div style={{ color: 'var(--neon-purple)', marginTop: '1rem' }}>Chargement...</div>}
    </div>
  );
}
