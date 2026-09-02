import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchCart, updateCartItem, checkoutCart } from '../redux/cart/operations';
import { selectCartItems } from '../redux/cart/selectors';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems) || [];
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return acc + (price * quantity);
  }, 0);

  const onSubmit = (data) => {
    const orderData = {
      shippingInfo: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      paymentMethod: data.paymentMethod,
      total: total.toFixed(2),
      items: items.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
    };
    dispatch(checkoutCart(orderData));
    reset();
    alert('Order placed successfully!');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p>Add some products to continue shopping</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      {/* Checkout Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: '#fff', padding: 24, borderRadius: 16 }}>
        <h2>Shipping Info</h2>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Full Name"
          style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</span>}

        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
          style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}

        <input
          {...register('phone', { required: 'Phone is required' })}
          placeholder="Phone"
          style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone.message}</span>}

        <input
          {...register('address', { required: 'Address is required' })}
          placeholder="Address"
          style={{ display: 'block', width: '100%', margin: '12px 0', padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.address && <span style={{ color: 'red', fontSize: '12px' }}>{errors.address.message}</span>}

        <h3>Payment Method</h3>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input type="radio" value="Cash On Delivery" {...register('paymentMethod', { required: true })} defaultChecked />
          {' '}Cash On Delivery
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input type="radio" value="Bank" {...register('paymentMethod', { required: true })} />
          {' '}Bank
        </label>

        <button type="submit" style={{ background: 'var(--primary-green)', color: '#fff', width: '100%', padding: 12, marginTop: 20, borderRadius: 8, cursor: 'pointer', border: 'none', fontWeight: 'bold' }}>
          Place order
        </button>
      </form>

      {/* Cart Items List */}
      <div style={{ background: '#fff', padding: 24, borderRadius: 16 }}>
        <h2>Cart Summary</h2>
        {items.map((item) => (
          <div key={item.product?._id || Math.random()} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            <div>
              <strong>{item.product?.name || 'Unknown Product'}</strong>
              <p>${(item.product?.price || 0).toFixed(2)} x {item.quantity}</p>
            </div>
            <button
              onClick={() => dispatch(updateCartItem({ productId: item.product._id, quantity: 0 }))}
              style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Remove
            </button>
          </div>
        ))}
        <h3 style={{ marginTop: 20, textAlign: 'right' }}>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

  const onSubmit = (data) => {
    dispatch(checkoutCart({ shippingInfo: data, paymentMethod: data.paymentMethod, total }));
    alert('Order placed successfully!');
  };

