import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/operations';
import styles from './Auth.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      navigate('/medicine');
    }
  };

  return (
    <div className={styles.authCard}>
      <h2 className={styles.title}>Log in</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Email Address"
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            className={styles.input}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>
        <button type="submit" className={styles.submitBtn}>Log in</button>
      </form>
      <p className={styles.linkText}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-green)' }}>Register</Link>
      </p>
    </div>
  );
};