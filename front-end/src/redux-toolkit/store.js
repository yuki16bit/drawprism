import { configureStore } from '@reduxjs/toolkit';
import socketReducer from '../features/socketSlice';
import socketIoMiddleware from './socketIoMiddleware';

export const store = configureStore({
  reducer: {
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([socketIoMiddleware]),
});
