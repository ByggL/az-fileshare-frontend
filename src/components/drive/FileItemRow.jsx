import React from 'react';


export default function FileItemRow({ item, onOpen, onRenameMove, onDelete, onShare }) {
  const isFolder = item.isFolder;
  return (
    <div className="drive-row">
      <button className="drive-row-main" onClick={() => isFolder && onOpen(item)}>
        <span className={`drive-icon ${isFolder ? 'drive-icon-folder' : 'drive-icon-file'}`} />
        <span className="drive-name">{item.name}</span>
      </button>
      {!isFolder && (
        <span className="drive-size">
          {item.size != null ? `${Math.round(item.size / 1024)} ko` : ''}
        </span>
      )}
      <div className="drive-actions">
        <button onClick={() => onRenameMove(item)}>✎</button>
        <button onClick={() => onShare(item)}>☍</button>
        <button onClick={() => onDelete(item)}>✕</button>
      </div>
    </div>
  );
}
