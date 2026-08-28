export default function Button({ children, variant = 'primary', ...props }) {
  const styles = {
    primary: { background: '#2f9e8f', color: '#fff' },
    secondary: { background: '#eef7f5', color: '#1f7a6d' },
  };

  return (
    <button style={styles[variant] || styles.primary} {...props}>
      {children}
    </button>
  );
}
