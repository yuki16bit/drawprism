import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import socketIoReducer from './features/socketIoSlice';
import toolBoxReducer from './features/toolBoxSlice';
import socketIoMiddleware from './middlewares/socketIoMiddleware';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    socketIo: socketIoReducer,
    toolBox: toolBoxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([socketIoMiddleware, apiSlice.middleware]),
});
