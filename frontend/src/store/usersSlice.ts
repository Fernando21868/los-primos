import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '../pagesAdmin/list/types';

export type State = {
  users: undefined | IUsers[];
  loading: boolean;
};

const initialState: State = {
  users: undefined,
  loading: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersAction: (state) => {
      state.loading = true;
    },
    getUsersAction: (state, action: PayloadAction<IUsers[] | undefined>) => {
      state.users = action.payload;
      state.loading = false;
    },
    updateUsersAction: (state, action: PayloadAction<IUsers[] | undefined>) => {
      state.users = action.payload;
      state.loading = false;
    },
    resetUsersAction: (state) => {
      state.users = undefined;
      state.loading = true;
    },
  },
});

export const { usersAction, getUsersAction, updateUsersAction, resetUsersAction } =
  userSlice.actions;
export default userSlice.reducer;
