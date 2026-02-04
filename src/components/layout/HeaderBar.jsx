import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import NeonButton from './NeonButton.jsx';

export default function HeaderBar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <header className="header-bar">
      <Link to="/" className="logo">
        az-fileshare
      </Link>
      <div className="header-actions">
        {!isAuthenticated && !isAuthPage && (
          <>
            <Link to="/login" className="header-link">
              Connexion
            </Link>
            <Link to="/register" className="header-link">
              Inscription
            </Link>
          </>
        )}
        {isAuthenticated && (
          <NeonButton variant="secondary" onClick={logout}>
            Déconnexion
          </NeonButton>
        )}
      </div>
    </header>
  );
}
