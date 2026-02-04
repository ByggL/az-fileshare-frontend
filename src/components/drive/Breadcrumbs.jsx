import React from 'react';

export default function Breadcrumbs({ path, onNavigate }) {
  return (
    <div className="drive-breadcrumbs">
      <button className="link-like" onClick={() => onNavigate(null)}>
        racine
      </button>
      {path.map((node, idx) => (
        <React.Fragment key={node.id || idx}>
          <span className="crumb-sep">/</span>
          <button className="link-like" onClick={() => onNavigate(node.id)}>
            {node.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
