import React, { useState } from 'react';
import NeonButton from '../layout/NeonButton.jsx';

export default function NewFolderForm({ onCreate, onCancel }) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      await onCreate(name.trim());
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Nouveau dossier</h2>
        <form onSubmit={submit}>
          <input
            className="auth-input"
            autoFocus
            placeholder="Nom du dossier"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="modal-actions">
            <NeonButton type="submit" disabled={busy}>
              Créer
            </NeonButton>
            <NeonButton type="button" variant="secondary" onClick={onCancel}>
              Annuler
            </NeonButton>
          </div>
        </form>
      </div>
    </div>
  );
}
