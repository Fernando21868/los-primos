import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '../interfaces/types';

export type State = {
  user: undefined | IUsers;
  users: undefined | IUsers[];
};

const initialState: State = {
  user: undefined,
  users: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserAction: (state, action: PayloadAction<IUsers | undefined>) => {
      state.user = action.payload;
    },
    updateUserAction: (state, action: PayloadAction<IUsers | undefined>) => {
      state.user = action.payload;
    },
    getUsersAction: (state, action: PayloadAction<IUsers[] | undefined>) => {
      state.users = action.payload;
    },
    updateUsersAction: (state, action: PayloadAction<IUsers[] | undefined>) => {
      state.users = action.payload;
    },
    resetUsersAction: (state) => {
      state.users = undefined;
    },
  },
});

export const {
  getUserAction,
  updateUserAction,
  getUsersAction,
  updateUsersAction,
  resetUsersAction,
} = userSlice.actions;
export default userSlice.reducer;
