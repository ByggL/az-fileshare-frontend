import React from 'react';

import FileItemRow from './FileItemRow.jsx';

export default function FileList({ items, onOpenFolder, onRenameMove, onDelete, onShare }) {
  if (!items.length) {
    return <div className="drive-empty">Dossier vide. Dépose des fichiers ou crée un dossier.</div>;
  }

  return (
    <div className="drive-list">
      {items.map((item) => (
        <FileItemRow
          key={item.id}
          item={item}
          onOpen={onOpenFolder}
          onRenameMove={onRenameMove}
          onDelete={onDelete}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
