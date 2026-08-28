import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchCart, updateCartItem, checkoutCart } from '../redux/cart/operations';
import { selectCartItems } from '../redux/cart/selectors';

export const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const onSubmit = (data) => {
    dispatch(checkoutCart({ shippingInfo: data, paymentMethod: data.paymentMethod, total }));
    alert('Order placed successfully!');
  };

  return (
    <div className="container" style={{ padding: '40px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      {/* Checkout Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: '#fff', padding: 24, borderRadius: 16 }}>
        <h2>Shipping Info</h2>
        <input {...register('name')} placeholder="Full Name" style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10 }} />
        <input {...register('email')} placeholder="Email" style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10 }} />
        <input {...register('phone')} placeholder="Phone" style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10 }} />
        <input {...register('address')} placeholder="Address" style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10 }} />
        
        <h3>Payment Method</h3>
        <label><input type="radio" value="Cash On Delivery" {...register('paymentMethod')} defaultChecked /> Cash On Delivery</label>
        <br />
        <label><input type="radio" value="Bank" {...register('paymentMethod')} /> Bank</label>
        
        <button type="submit" style={{ background: 'var(--primary-green)', color: '#fff', width: '100%', padding: 12, marginTop: 20, borderRadius: 8 }}>
          Place order
        </button>
      </form>

      {/* Cart Items List */}
      <div style={{ background: '#fff', padding: 24, borderRadius: 16 }}>
        <h2>Cart Summary</h2>
        {items.map((item) => (
          <div key={item.product._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <div>
              <strong>{item.product.name}</strong>
              <p>${item.product.price} x {item.quantity}</p>
            </div>
            <button onClick={() => dispatch(updateCartItem({ productId: item.product._id, quantity: 0 }))} style={{ color: 'red' }}>
              Remove
            </button>
          </div>
        ))}
        <h3 style={{ marginTop: 20 }}>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};