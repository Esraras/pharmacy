import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const res = await api.get('/cart');
    // Backend returns { userId, items: [...] }
    return { items: res.data.items || [], userId: res.data.userId || null };
  } catch (err) {
    // If not authenticated, return empty cart
    return { items: [], userId: null };
  }
});

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await api.put('/cart/update', { productId, quantity });
      return res.data;
    } catch (err) {
      // If not authenticated, store in local state only
      const state = thunkAPI.getState();
      const currentItems = state.cart.items || [];
      const itemIndex = currentItems.findIndex((item) => item.product === productId);
      
      if (itemIndex > -1) {
        if (quantity <= 0) {
          currentItems.splice(itemIndex, 1);
        } else {
          currentItems[itemIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        currentItems.push({ product: productId, quantity });
      }
      
      return { items: currentItems };
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (orderData, thunkAPI) => {
    try {
      const res = await api.post('/cart/checkout', orderData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Checkout failed. Please login first.');
    }
  }
);