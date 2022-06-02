import { createSlice, nanoid } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
    user: {},
    chatLines: [],
    drawLines: [],
  },
  reducers: {
    startConnecting: (state) => {
      return { ...state, isEstablishingConnection: true };
    },
    connectionEstablished: (state) => {
      return { ...state, isConnected: true, isEstablishingConnection: true };
    },
    anonymousSignin: (state, action) => {
      return { ...state, user: action.payload, isEstablishingConnection: false };
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

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
