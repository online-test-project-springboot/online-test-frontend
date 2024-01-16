import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import topicApi from 'api/topicApi';
import StorageKeys from 'constants/storage-keys';


export const getAllTopic = createAsyncThunk('topics', async () => {
  const response = await topicApi.getAll();
  localStorage.setItem(StorageKeys.TOPICLIST, JSON.stringify(response.data))
  return response.data;
});

// export const login = createAsyncThunk('user/login', async (payload) => {
//   const response = await userApi.login(payload);

//   localStorage.setItem(StorageKeys.TOKEN, response.jwt.token);
//   localStorage.setItem(StorageKeys.DATA, JSON.stringify(response.data));

//   return response.data;
// });

const topicSlice = createSlice({
  name: 'user',
  initialState: {
    topicList: JSON.parse(localStorage.getItem(StorageKeys.TOPICLIST)) || [],

  },
  reducers: {
    // logout(state) {
    //   //clear local storage
    //   state.current = {};
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllTopic.fulfilled, (state, action) => {
      state.topicList = action.payload;
    });
  },
});

const { reducer, actions } = topicSlice;

export default reducer; //default export
