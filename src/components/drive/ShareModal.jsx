import React from 'react';
import NeonButton from '../layout/NeonButton.jsx';

export default function ShareModal({ url, onClose }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papier.');
    } catch {
      alert('Impossible de copier, copie manuelle.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Lien de partage</h2>
        <p className="share-url">{url}</p>
        <div className="modal-actions">
          <NeonButton onClick={copy}>Copier</NeonButton>
          <NeonButton variant="secondary" onClick={onClose}>
            Fermer
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
