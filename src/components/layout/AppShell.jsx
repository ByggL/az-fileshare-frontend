import React from 'react';
import HeaderBar from './HeaderBar.jsx';

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <HeaderBar />
      <main className="app-main">{children}</main>
    </div>
  );
}
