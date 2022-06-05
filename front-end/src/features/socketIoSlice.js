import { createSlice, nanoid } from '@reduxjs/toolkit';

export const socketIoSlice = createSlice({
  name: 'socketIo',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
    chatLines: [],
    drawLines: [],
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
      // return { ...state, chatLines: [action.payload, ...state.chatLines] };
    },
    receiveChat: (state, action) => {
      const newLine = { lineId: nanoid(), ...action.payload };
      return { ...state, chatLines: [newLine, ...state.chatLines] };
    },
    sendDraw: (state, action) => {
      console.log('send draw');
    },
    receiveDraw: (state, action) => {
      return { ...state, drawLines: [...state.drawLines, action.payload] };
    },
  },
});

export const socketIoActions = socketIoSlice.actions;

export default socketIoSlice.reducer;
