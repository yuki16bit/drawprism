import { createSlice, nanoid } from '@reduxjs/toolkit';

export const socketIoSlice = createSlice({
  name: 'socketIo',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
    chatLines: [],
    currentDrawLine: {},
  },
  reducers: {
    startConnecting: (state) => {
      return { ...state, isEstablishingConnection: true };
    },
    connectionEstablished: (state) => {
      return { ...state, isConnected: true, isEstablishingConnection: false };
    },
    joinRoom: (state, action) => {
      console.log('join room');
    },
    sendChat: (state, action) => {
      console.log('send chat');
    },
    receiveChat: (state, action) => {
      const newLine = { lineId: nanoid(), ...action.payload };
      return { ...state, chatLines: [newLine, ...state.chatLines] };
    },
    sendDraw: (state, action) => {
      console.log('send draw');
    },
    receiveDraw: (state, action) => {
      console.log('receive draw');
      return { ...state, currentDrawLine: { ...action.payload } };
    },
    leaveRoom: (state, action) => {
      console.log('leave room');
    },
    disconnect: (state) => {
      console.log('disconnect');
      return { ...state, isConnected: false };
    },
  },
});

export const socketIoActions = socketIoSlice.actions;

export default socketIoSlice.reducer;
