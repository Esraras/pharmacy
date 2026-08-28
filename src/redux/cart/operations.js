import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const res = await instance.get('/cart');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await instance.put('/cart/update', { productId, quantity });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (orderData, thunkAPI) => {
    try {
      const res = await instance.post('/cart/checkout', orderData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);