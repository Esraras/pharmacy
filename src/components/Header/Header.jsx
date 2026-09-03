import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import styles from "./Header.module.css";
import { selectCartItems } from "../../redux/cart/selectors";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems) || [];

  const totalItems = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

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
          <NavLink to="/" className={styles.navLink}>
            Home
          </NavLink>
          <NavLink to="/medicine-store" className={styles.navLink}>
            Medicine store
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/medicine" className={styles.navLink}>
              Medicine
            </NavLink>
          )}
        </nav>

        <div className={styles.authNav}>
          {isLoggedIn ? (
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                color: "white",
              }}
            >
              <Link
                to="/cart"
                className={styles.cartButton}
                aria-label="Shopping cart"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className={styles.cartCount}>{totalItems}</span>
                )}
              </Link>

              <span>{user.name}</span>
              <button
                onClick={() => dispatch(logout())}
                className={styles.loginBtn}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/register" className={styles.registerBtn}>
                Register
              </Link>
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
