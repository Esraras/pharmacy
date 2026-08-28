import { useEffect, useState } from 'react';
import { instance } from '../../services/api';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    instance.get('/customer-reviews').then((res) => setReviews(res.data));
  }, []);

  return (
    <div style={{ margin: '40px 0' }}>
      <h2>Reviews</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 20 }}>
        {reviews.map((rev) => (
          <div key={rev._id} style={{ background: 'var(--white)', padding: 16, borderRadius: 12, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <img src={rev.avatar} alt={rev.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
              <strong>{rev.name}</strong>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{rev.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};