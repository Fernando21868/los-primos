import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import userAuthReducer from './authSlice';

// export const store = configureStore({
//   reducer: { user: userReducer, category: categoryReducer, userAuth: userAuthReducer },
// });

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import lightDarkModeSlice from './lightDarkModeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'category', 'userAuth'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    category: categoryReducer,
    userAuth: userAuthReducer,
    lightDarkMode: lightDarkModeSlice,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
