import { createSlice } from '@reduxjs/toolkit';

type State = {
  darkMode: boolean;
};

const initialState: State = {
  darkMode: false,
};

export const lightDarkModeSlice = createSlice({
  name: 'lightDarkMode',
  initialState,
  reducers: {
    changeLightDarkModeAction: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { changeLightDarkModeAction } = lightDarkModeSlice.actions;
export default lightDarkModeSlice.reducer;
