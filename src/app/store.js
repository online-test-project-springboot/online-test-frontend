import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/Auth/userSlice';
import topicList from '../features/Topic/topicSlice';

const rootReducer = {
  user: userReducer,
  topic: topicList,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
