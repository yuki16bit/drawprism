import { createSlice } from '@reduxjs/toolkit';

export const toolBoxSlice = createSlice({
  name: 'toolBox',
  initialState: {
    currentColor: '#000000',
    freeColor: '#000000',
    penSize: 3,
  },
  reducers: {
    changeCurrentColor: (state, action) => {
      return { ...state, currentColor: action.payload };
    },
    changeFreeColor: (state, action) => {
      return { ...state, freeColor: action.payload };
    },
    changePenSize: (state, action) => {
      return { ...state, penSize: action.payload };
    },
  },
});

export const toolBoxActions = toolBoxSlice.actions;

export default toolBoxSlice.reducer;
