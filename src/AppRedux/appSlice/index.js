import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  value: 0,
  themeMode: 'system', // 'system', 'light', or 'dark'
  prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleThemeMode: (state, action) => {
      if (action.payload === 'system') {
        state.themeMode = 'system';
        state.prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else if (action.payload === 'light') {
        state.themeMode = 'light';
        state.prefersDarkMode = false;
      } else if (action.payload === 'dark') {
        state.themeMode = 'dark';
        state.prefersDarkMode = true;
      }
    },
  },
});

const persistConfig = {
  key: 'app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appSlice.reducer);

export const { toggleThemeMode } = appSlice.actions;
export default persistedReducer;