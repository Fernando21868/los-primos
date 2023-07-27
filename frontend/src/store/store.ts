import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import userAuthReducer from './authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import lightDarkModeSlice from './lightDarkModeSlice';
import productSlice from './productSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userAuth', 'lightDarkMode'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    category: categoryReducer,
    userAuth: userAuthReducer,
    lightDarkMode: lightDarkModeSlice,
    product: productSlice,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
