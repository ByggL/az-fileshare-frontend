import React from 'react';
import NeonButton from '../layout/NeonButton.jsx';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <NeonButton onClick={onConfirm}>Oui</NeonButton>
          <NeonButton variant="secondary" onClick={onCancel}>
            Non
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
