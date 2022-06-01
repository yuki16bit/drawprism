import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
    user: { uuid: '', name: '' },
    chatLines: [],
  },
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    anonymousSignin: (state, action) => {
      console.log('socket slice user', action.payload);
      state.user = action.payload;
    },
    sendChat: (state) => {
      console.log('send chat');
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
