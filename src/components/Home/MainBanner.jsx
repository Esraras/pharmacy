import styles from './Home.module.css';

export const MainBanner = () => {
  return (
    <div className={styles.mainBanner}>
      <div className="container">
        <h1 className={styles.bannerTitle}>Your medication, delivered</h1>
        <p className={styles.bannerSub}>Say goodbye to all your healthcare worries with us</p>
      </div>
    </div>
  );
};