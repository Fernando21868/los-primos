import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '../pagesAdmin/list/types';

type TPermisions = 'cliente' | 'gerente' | 'empleado' | 'administrador';

type State = {
  userAuth: undefined | IUsers;
  permissions: TPermisions | undefined;
  isLoogged: string;
};

const initialState: State = {
  userAuth: undefined,
  permissions: undefined,
  isLoogged: 'logout',
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    authenticatedAction: (state, action: PayloadAction<IUsers | undefined>) => {
      state.userAuth = action.payload;
    },
    authorizedAction: (state, action: PayloadAction<TPermisions | undefined>) => {
      state.permissions = action.payload;
    },
    loggedOutAction: (state) => {
      state.userAuth = undefined;
    },
    loggoutAuthorizedAction: (state) => {
      state.permissions = undefined;
    },
    logoutAction: (state) => {
      state.isLoogged = 'logout';
    },
    loginAction: (state) => {
      state.isLoogged = 'login';
    },
  },
});

export const {
  authenticatedAction,
  authorizedAction,
  loggedOutAction,
  loggoutAuthorizedAction,
  logoutAction,
  loginAction,
} = userAuthSlice.actions;
export default userAuthSlice.reducer;
