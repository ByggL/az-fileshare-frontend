import React, { useState } from 'react';
import NeonButton from '../layout/NeonButton.jsx';

export default function RenameMoveModal({ item, onSubmit, onCancel }) {
  const [name, setName] = useState(item.name);
  const [parentId, setParentId] = useState(item.parentId || '');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {};
      if (name && name !== item.name) payload.name = name;
      if (parentId !== (item.parentId || '')) payload.parentId = parentId || null;
      await onSubmit(payload);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Renommer / déplacer</h2>
        <form onSubmit={handleSubmit}>
          <label className="auth-label">
            Nom
            <input
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="auth-label">
            ID dossier parent (optionnel)
            <input
              className="auth-input"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <NeonButton type="submit" disabled={busy}>
              Enregistrer
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
