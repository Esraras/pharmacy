import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/products/operations';
import { selectSelectedProduct, selectIsLoadingProducts } from '../redux/products/selectors';
import { updateCartItem } from '../redux/cart/operations';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const loading = useSelector(selectIsLoadingProducts);
  const [tab, setTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="container">Loading...</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', gap: 40, background: '#fff', padding: 32, borderRadius: 16 }}>
        <img 
          src={product.photo || '/placeholder.png'} 
          alt={product.name} 
          style={{ width: 300, height: 300, objectFit: 'contain' }} 
        />
        <div>
          <h2>{product.name || 'Unknown Product'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Brand: {product.brand || 'N/A'}</p>
          <p style={{ fontSize: 24, fontWeight: 'bold', margin: '16px 0' }}>${product.price || 0}</p>
          
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              style={{ width: 60, padding: 8 }}
            />
            <button
              onClick={() => dispatch(updateCartItem({ productId: product._id, quantity }))}
              style={{ background: 'var(--primary-green)', color: '#fff', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', border: 'none' }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, background: '#fff', padding: 24, borderRadius: 16 }}>
        <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          <button onClick={() => setTab('description')} style={{ fontWeight: tab === 'description' ? 'bold' : 'normal', cursor: 'pointer', background: 'none', border: 'none' }}>
            Description
          </button>
          <button onClick={() => setTab('reviews')} style={{ fontWeight: tab === 'reviews' ? 'bold' : 'normal', cursor: 'pointer', background: 'none', border: 'none' }}>
            Reviews
          </button>
        </div>

        {tab === 'description' ? (
          <p style={{ marginTop: 16 }}>{product.description || 'No description available'}</p>
        ) : (
          <div style={{ marginTop: 16 }}>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((r, i) => (
                <div key={i} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
                  <strong>{r.author || 'Anonymous'}</strong> - ⭐ {r.rating || 0}
                  <p>{r.comment || ''}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};