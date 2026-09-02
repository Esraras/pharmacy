import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/operations';
import styles from './Auth.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register: registerField, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    const result = await dispatch(register({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    }));
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
            {...registerField('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            placeholder="User Name"
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            {...registerField('email', { 
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
            })}
            placeholder="Email Address"
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            {...registerField('phone', { 
              required: 'Phone is required',
              pattern: { value: /^[\d\+\-\s\(\)]+$/, message: 'Invalid phone format' }
            })}
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
        <div className={styles.inputGroup}>
          <input
            type="password"
            {...registerField('confirmPassword', { 
              required: 'Confirm password is required',
              validate: (value) => value === password || 'Passwords do not match'
            })}
            placeholder="Confirm Password"
            className={styles.input}
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" className={styles.submitBtn}>Register</button>
      </form>
      <p className={styles.linkText}>
        Already have account? <Link to="/login" style={{ color: 'var(--primary-green)' }}>Log in</Link>
      </p>
    </div>
  );
};