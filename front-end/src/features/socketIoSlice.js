import { createSlice, nanoid } from '@reduxjs/toolkit';

export const socketIoSlice = createSlice({
  name: 'socketIo',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
    chatLines: [],
    drawingData: {},
  },
  reducers: {
    startConnecting: (state) => {
      return { ...state, isEstablishingConnection: true };
    },
    connectionEstablished: (state) => {
      return { ...state, isConnected: true, isEstablishingConnection: false };
    },
    joinRoom: (state, action) => {
      return;
    },
    sendChat: (state, action) => {
      return;
    },
    receiveChat: (state, action) => {
      const newLine = { id: nanoid(), ...action.payload };
      return { ...state, chatLines: [newLine, ...state.chatLines] };
    },
    sendDraw: () => {
      return;
    },
    saveDraw: () => {
      return;
    },
    receiveDraw: (state, action) => {
      return { ...state, drawingData: { ...action.payload } };
    },
    leaveRoom: (state, action) => {
      return;
    },
    addChatLog: (state, action) => {
      const divideLine = {
        id: nanoid(),
        text: '—History Chat Logs—',
      };
      return { ...state, chatLines: [divideLine, ...action.payload] };
    },
  },
});

export const socketIoActions = socketIoSlice.actions;

export default socketIoSlice.reducer;
