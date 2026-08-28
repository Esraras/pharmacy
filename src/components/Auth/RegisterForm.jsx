import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/operations';
import styles from './Auth.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register: registerField, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      navigate('/medicine');
    }
  };

  return (
    <div className={styles.authCard}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <input
            {...registerField('name', { required: 'Name is required' })}
            placeholder="User Name"
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            {...registerField('email', { 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
            placeholder="Email Address"
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            {...registerField('phone', { required: 'Phone is required' })}
            placeholder="Phone Number"
            className={styles.input}
          />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            {...registerField('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })}
            placeholder="Password"
            className={styles.input}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>
        <button type="submit" className={styles.submitBtn}>Register</button>
      </form>
      <p className={styles.linkText}>
        Already have account? <Link to="/login" style={{ color: 'var(--primary-green)' }}>Log in</Link>
      </p>
    </div>
  );
};