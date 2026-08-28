import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async ({ category = '', query = '', page = 1 }, thunkAPI) => {
    try {
      const response = await instance.get('/products', {
        params: { category, query, page, limit: 12 },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await instance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);