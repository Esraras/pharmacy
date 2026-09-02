import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products/operations';
import { selectProducts, selectTotalPages } from '../redux/products/selectors';
import { updateCartItem } from '../redux/cart/operations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const MedicinePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProducts({ category, query, page })).finally(() => setLoading(false));
  }, [dispatch, category, query, page]);

  const handleAddToCart = (product) => {
    dispatch(updateCartItem({ productId: product._id, quantity: 1 }));

    toast.success(`${product.name || 'Product'} added to cart!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored", // Yeşil/Şık tema için
  });
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1>Medicine</h1>
      
      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: 16, margin: '24px 0' }}>
        <input
          type="text"
          placeholder="Search medicine"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc', flex: 1 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 10, borderRadius: 8 }}>
          <option value="">All Categories</option>
          <option value="Medicine">Medicine</option>
          <option value="Heart">Heart</option>
          <option value="Skin">Skin</option>
        </select>
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>Nothing was found for your request</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {products.map((p) => (
            <div key={p._id} style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #eee' }}>
              <img src={p.photo} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'contain' }} />
              <h3 style={{ fontSize: 16, margin: '8px 0' }}>{p.name}</h3>
              <p style={{ fontWeight: 'bold' }}>${p.price}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => handleAddToCart(p)}
                  style={{ background: 'var(--primary-green)', color: '#fff', flex: 1, padding: 8, borderRadius: 6 }}
                >
                  Add to cart
                </button>
                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  style={{ border: '1px solid #ccc', padding: 8, borderRadius: 6 }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: '8px 12px',
                borderRadius: 4,
                background: page === i + 1 ? 'var(--primary-green)' : '#fff',
                color: page === i + 1 ? '#fff' : '#000',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};