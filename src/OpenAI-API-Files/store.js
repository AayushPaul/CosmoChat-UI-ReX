
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice.js';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
