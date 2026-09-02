import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const MedicineStorePage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/stores')
      .then((res) => {
        setStores(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching stores:', err);
        setError('Failed to load stores');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1>Medicine Store</h1>
      
      {loading && <p>Loading stores...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && stores.length === 0 && !error && <p>No stores available</p>}
      
      {!loading && stores.length > 0 && (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginTop: 24 }}>
        {stores.map((store) => (
          <div key={store._id} style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid var(--border-color)' }}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>{store.phone}</p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>Hours: {store.hours}</p>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⭐ {store.rating}</span>
              <button style={{ background: 'var(--primary-green)', color: '#fff', padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer' }}>
                Visit Store
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};