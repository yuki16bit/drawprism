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
      return { ...state, isEstablishingConnection: true };
    },
    connectionEstablished: (state) => {
      return { ...state, isConnected: true, isEstablishingConnection: true };
    },
    anonymousSignin: (state, action) => {
      return { ...state, user: action.payload };
    },
    sendChat: (state) => {
      console.log('send chat');
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
