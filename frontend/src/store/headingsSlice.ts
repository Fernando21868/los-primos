import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '../pagesAdmin/list/types';

type State = {
  user: undefined | IUsers;
  loading: boolean;
};

const initialState: State = {
  user: undefined,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAction: (state) => {
      state.loading = true;
    },
    getUserAction: (state, action: PayloadAction<IUsers | undefined>) => {
      state.user = action.payload;
      state.loading = false;
    },
    updateUserAction: (state, action: PayloadAction<IUsers | undefined>) => {
      state.user = action.payload;
      state.loading = false;
    },
    resetUserAction: (state) => {
      state.user = undefined;
      state.loading = true;
    },
  },
});

export const { userAction, getUserAction, updateUserAction, resetUserAction } = userSlice.actions;
export default userSlice.reducer;
