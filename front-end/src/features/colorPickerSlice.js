import { createSlice, nanoid } from '@reduxjs/toolkit';

export const colorPickerSlice = createSlice({
  name: 'colorPicker',
  initialState: {
    colorCode: '',
  },
  reducers: {
    changeColor: (state, action) => {
      return { ...state, colorCode: action.payload };
    },
  },
});

export const colorPickerActions = colorPickerSlice.actions;

export default colorPickerSlice.reducer;
