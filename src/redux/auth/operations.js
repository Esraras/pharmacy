import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader } from '../../services/api';

/*
 * POST /api/user/register
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/user/register', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Kayıt işlemi başarısız oldu.'
      );
    }
  }
);

/*
 * POST /api/user/login
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/user/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Giriş yapılamadı. Bilgilerinizi kontrol edin.'
      );
    }
  }
);

/*
 * GET /api/user/logout
 */
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.get('/user/logout');
    clearAuthHeader();
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET /api/user/user-info
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Token bulunamadı.');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await api.get('/user/user-info');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);