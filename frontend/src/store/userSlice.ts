import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '../pagesAdmin/list/types';

export type State = {
  user: undefined | IUsers;
  loading: boolean;
  headings:
    | {
        firstName: string;
        lastName: string;
        email: string;
        profilePhoto: string;
        createdAt?: string;
        updatedAt?: string;
        dni: string;
        phoneNumber: string;
        sex: string;
        password?: string;
        repeatPassword?: string;
      }
    | undefined;
};

const initialState: State = {
  user: undefined,
  loading: false,
  headings: undefined,
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
    setHeadingsUserAction: (state, action: PayloadAction<State['headings'] | undefined>) => {
      state.headings = action.payload;
    },
    resetHeadingsUserAction: (state) => {
      state.headings = undefined;
    },
  },
});

export const {
  userAction,
  getUserAction,
  updateUserAction,
  resetUserAction,
  setHeadingsUserAction,
  resetHeadingsUserAction,
} = userSlice.actions;
export default userSlice.reducer;
