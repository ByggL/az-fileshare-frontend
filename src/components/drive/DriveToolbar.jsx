import React from 'react';
import NeonButton from '../layout/NeonButton.jsx';

export default function DriveToolbar({ onRefresh, onNewFolder, onUploadClick }) {
  return (
    <div className="drive-toolbar">
      <NeonButton onClick={onRefresh}>Rafraîchir</NeonButton>
      <NeonButton variant="secondary" onClick={onNewFolder}>
        Nouveau dossier
      </NeonButton>
      <NeonButton variant="secondary" onClick={onUploadClick}>
        Upload fichier
      </NeonButton>
    </div>
  );
}
