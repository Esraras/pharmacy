import { createSlice } from '@reduxjs/toolkit';
import { fetchCart, updateCartItem, checkoutCart } from './operations';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const cartReducer = cartSlice.reducer;