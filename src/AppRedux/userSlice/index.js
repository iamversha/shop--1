import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiClient from '../../Utility/apiClient';

export const userLogin = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
      const authResponse = await apiClient.post(`auth/login`, credentials);
      const tokens = authResponse.data;
      const profileResponse = await apiClient.get(`auth/profile`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });
      const profile = profileResponse.data;

      return {...tokens, profile};
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  profile: null,
  token: "",
  refreshToken: "",
  status: 'idle',
  error: null ,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = initialState.profile;
      state.token = initialState.token;
      state.refreshToken = initialState.refreshToken;
      state.status = initialState.status;
      state.error = initialState.error;
    },
    updateTokens: (state, action) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.profile = action.payload.profile;
        state.status = 'succeeded';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
  },
});

const persistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { logout, updateTokens } = userSlice.actions;
export default persistedUserReducer;