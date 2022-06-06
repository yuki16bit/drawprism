import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import socketIoReducer from './features/socketIoSlice';
import colorPickerReducer from './features/colorPickerSlice';
import socketIoMiddleware from './middlewares/socketIoMiddleware';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    socketIo: socketIoReducer,
    colorPicker: colorPickerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([socketIoMiddleware, apiSlice.middleware]),
});
