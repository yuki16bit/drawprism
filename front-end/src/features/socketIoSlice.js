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
  },
});

export const socketIoActions = socketIoSlice.actions;

export default socketIoSlice.reducer;
