import React from 'react';

export default function NeonButton({ children, variant = 'primary', ...rest }) {
  const className = ['neon-btn', `neon-btn--${variant}`, rest.className]
    .filter(Boolean)
    .join(' ');
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}
