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
    sendDraw: () => {
      return;
    },
    receiveDraw: (state, action) => {
      return { ...state, currentDrawLine: { ...action.payload } };
    },
    leaveRoom: (state, action) => {
      console.log('leave room');
    },
  },
});

export const socketIoActions = socketIoSlice.actions;

export default socketIoSlice.reducer;
