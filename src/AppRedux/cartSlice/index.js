import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity if the product already exists
      } else {
        state.push({ product, quantity }); // Add new product to the cart
      }
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.find((item) => item.product.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrement quantity
        } else {
          return state.filter((item) => item.product.id !== action.payload.id); // Remove item if quantity is 1
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.product.id !== action.payload.id); // Completely remove item
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;