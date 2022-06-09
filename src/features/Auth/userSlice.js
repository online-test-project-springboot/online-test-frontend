import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageKeys from 'constants/storage-keys';
import userApi from '../../api/userApi';

export const register = createAsyncThunk('user/register', async (payload) => {
  const response = await userApi.register(payload);

  localStorage.setItem(StorageKeys.TOKEN, response.jwt.token);
  localStorage.setItem(StorageKeys.DATA, JSON.stringify(response.data));

  return response.data;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  const response = await userApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, response.jwt.token);
  localStorage.setItem(StorageKeys.DATA, JSON.stringify(response.data));

  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.DATA)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      state.current = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { reducer, actions } = userSlice;
export const { logout } = actions;

export default reducer; //default export
