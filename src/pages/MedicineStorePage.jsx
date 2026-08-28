import { useEffect, useState } from 'react';
import { instance } from '../services/api';

export const MedicineStorePage = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    instance.get('/stores').then((res) => setStores(res.data));
  }, []);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1>Medicine Store</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginTop: 24 }}>
        {stores.map((store) => (
          <div key={store._id} style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid var(--border-color)' }}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>{store.phone}</p>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⭐ {store.rating}</span>
              <button style={{ background: 'var(--primary-green)', color: '#fff', padding: '6px 12px', borderRadius: 6 }}>
                Visit Store
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};