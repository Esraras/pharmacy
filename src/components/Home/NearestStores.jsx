import { useEffect, useState } from 'react';
import { instance } from '../../services/api';
import styles from './Home.module.css';

export const NearestStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    instance.get('/stores/nearest').then((res) => setStores(res.data));
  }, []);

  return (
    <div style={{ margin: '40px 0' }}>
      <h2>Your Nearest Medicine Store</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Search for Medicine, Filter by your location</p>

      <div className={styles.storeGrid}>
        {stores.map((store) => (
          <div key={store._id} className={styles.storeCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{store.name}</h3>
              <span className={`${styles.status} ${store.status === 'OPEN' ? styles.statusOpen : styles.statusClosed}`}>
                {store.status}
              </span>
            </div>
            <p style={{ margin: '8px 0', fontSize: 14 }}>{store.address}</p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{store.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};