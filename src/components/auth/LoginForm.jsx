import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import NeonButton from "../layout/NeonButton.jsx";

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
    } catch (err) {
      setError("Échec de connexion.");
      console.error(err);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="auth-label">
        Email
        <input
          className="auth-input"
          type="text"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </label>
      <label className="auth-label">
        Mot de passe
        <input
          className="auth-input"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        />
      </label>
      {error && <div className="auth-error">{error}</div>}
      <NeonButton type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </NeonButton>
    </form>
  );
}
