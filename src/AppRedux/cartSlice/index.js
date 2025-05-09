import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  cartItems: [],
  isLoading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload]
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

const persistConfig = {
  key: "cartItems",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, cartSlice.reducer);
export const { setCartItems, removeCartItem, clearCart } = cartSlice.actions;
export default persistedUserReducer;
