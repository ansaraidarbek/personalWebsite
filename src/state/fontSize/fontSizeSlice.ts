import { createSlice } from "@reduxjs/toolkit";


interface fontSizeState { 
    value: number;
}

const findFontSize = () => {
  // find font size
  const el = document.documentElement;
  const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  const fontSize = parseFloat(style);
  return fontSize ? fontSize : 16;
}

const initialState: fontSizeState = {
    value: findFontSize(),
};

const fontSizeSlice = createSlice({
    name: 'fontSize',
    initialState,
    reducers: {
        changeFontSize: (state) => {
        const newFontSize = findFontSize();
        if (newFontSize !== state.value) {
          state.value = newFontSize;
        }
      }
    }
});

export const { changeFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;