export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange?.(page)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: page === currentPage ? '1px solid #2f9e8f' : '1px solid #dfe7e6',
            background: page === currentPage ? '#2f9e8f' : '#fff',
            color: page === currentPage ? '#fff' : '#1f2937',
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
