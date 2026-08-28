import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import styles from './Header.module.css';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          <svg className={styles.logoIcon}>
            <use href="/icons/sprite.svg#icon-logo"></use>
          </svg>
          <span>E-Pharmacy</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navLink}>Home</NavLink>
          <NavLink to="/medicine-store" className={styles.navLink}>Medicine store</NavLink>
          {isLoggedIn && <NavLink to="/medicine" className={styles.navLink}>Medicine</NavLink>}
        </nav>

        <div className={styles.authNav}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span>{user.name}</span>
              <button onClick={() => dispatch(logout())} className={styles.loginBtn}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/register" className={styles.registerBtn}>Register</Link>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};