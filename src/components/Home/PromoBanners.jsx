import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export const PromoBanners = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.promoGrid}>
      <div className={styles.promoCard}>
        <h3>Huge Sale</h3>
        <p style={{ fontSize: 28, fontWeight: 'bold', color: 'var(--primary-green)' }}>70% OFF</p>
        <button className={styles.promoBtn} onClick={() => navigate('/medicine?discount=70')}>
          Shop now
        </button>
      </div>
      <div className={styles.promoCard}>
        <h3>Secure delivery</h3>
        <p style={{ fontSize: 28, fontWeight: 'bold' }}>100% Guarantee</p>
        <button className={styles.promoBtn} onClick={() => navigate('/medicine-store')}>
          Read more
        </button>
      </div>
      <div className={styles.promoCard}>
        <h3>Off</h3>
        <p style={{ fontSize: 28, fontWeight: 'bold', color: 'var(--primary-green)' }}>35% OFF</p>
        <button className={styles.promoBtn} onClick={() => navigate('/medicine?discount=35')}>
          Shop now
        </button>
      </div>
    </div>
  );
};