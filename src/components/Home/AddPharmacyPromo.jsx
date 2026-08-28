import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export const AddPharmacyPromo = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.promoCard} style={{ backgroundColor: 'var(--white)', margin: '40px 0' }}>
      <h2>Add your local pharmacy online now</h2>
      <p style={{ margin: '12px 0' }}>
        Enjoy the convenience of having your prescriptions filled from home by connecting with your community pharmacy through our online platform.
      </p>
      <button className={styles.promoBtn} onClick={() => navigate('/medicine-store')}>
        Buy medicine
      </button>
      <ul style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <li>✔ Take user orders online</li>
        <li>✔ Create your shop profile</li>
        <li>✔ Manage your store</li>
        <li>✔ Get more orders</li>
      </ul>
    </div>
  );
};