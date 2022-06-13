import { createSlice } from '@reduxjs/toolkit';

export const toolBoxSlice = createSlice({
  name: 'toolBox',
  initialState: {
    colorCode: '#000000',
    penSize: 3,
  },
  reducers: {
    changeColor: (state, action) => {
      return { ...state, colorCode: action.payload };
    },
    changePenSize: (state, action) => {
      return { ...state, penSize: action.payload };
    },
  },
});

export const toolBoxActions = toolBoxSlice.actions;

export default toolBoxSlice.reducer;
