import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topSection}>
          <div>
            <Link to="/" className={styles.logo}>
              <svg style={{ width: 28, height: 28, fill: '#fff' }}>
                <use href="/icons/sprite.svg#icon-logo"></use>
              </svg>
              E-Pharmacy
            </Link>
            <p className={styles.text}>
              Get the medicine to help you feel better, get back to your active life, and enjoy every moment.
            </p>
            <div className={styles.socials}>
              <a href="https://www.facebook.com/goITclub/" target="_blank" rel="noreferrer">
                <svg className={styles.socialIcon}><use href="/icons/sprite.svg#icon-facebook"></use></svg>
              </a>
              <a href="https://www.instagram.com/goitclub/" target="_blank" rel="noreferrer">
                <svg className={styles.socialIcon}><use href="/icons/sprite.svg#icon-instagram"></use></svg>
              </a>
              <a href="https://www.youtube.com/c/GoIT" target="_blank" rel="noreferrer">
                <svg className={styles.socialIcon}><use href="/icons/sprite.svg#icon-youtube"></use></svg>
              </a>
            </div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/">Home</Link>
            <Link to="/medicine-store">Medicine store</Link>
            <Link to="/medicine">Medicine</Link>
          </nav>
        </div>
        <div className={styles.bottomSection}>
          <p>© E-Pharmacy 2023. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};