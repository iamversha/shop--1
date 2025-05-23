import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { setStore } from '../Utility/apiClient';
import persistedReducer from './appSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice'

const store = configureStore({
  reducer: {
    app: persistedReducer,
    user: userReducer, // Added user slice
    cartItems: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Set the store dynamically in the apiClient
setStore(store);

export const persistor = persistStore(store);

export default store;