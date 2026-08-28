export default function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', minWidth: '320px' }}>
        <button type="button" onClick={onClose} style={{ marginBottom: '12px' }}>Kapat</button>
        {children}
      </div>
    </div>
  );
}
