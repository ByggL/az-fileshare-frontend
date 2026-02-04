import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedItem, getSharedDownloadUrl } from '../api/drive.js';

export default function SharedViewPage() {
  const { token } = useParams();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getSharedItem(token);
        setMeta(data);
      } catch (err) {
        setError('Lien invalide ou expiré.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [token]);

  const handleDownload = () => {
    const url = getSharedDownloadUrl(token);
    window.open(url, '_blank');
  };

  return (
    <div className="shared-page">
      <div className="shared-card">
        <h1>Partage de fichier</h1>
        {loading && <div>Chargement...</div>}
        {error && <div className="auth-error">{error}</div>}
        {meta && (
          <>
            <div className="shared-meta">
              <div>
                <span className="label">Nom :</span> {meta.name}
              </div>
              <div>
                <span className="label">Taille :</span>{' '}
                {meta.size != null ? `${Math.round(meta.size / 1024)} ko` : 'N/A'}
              </div>
              <div>
                <span className="label">Type :</span> {meta.mimeType || 'N/A'}
              </div>
            </div>
            <button className="neon-btn neon-btn--primary" onClick={handleDownload}>
              Télécharger
            </button>
          </>
        )}
      </div>
    </div>
  );
}
