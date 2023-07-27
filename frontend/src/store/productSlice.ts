import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../interfaces/types';

type State = {
  products: undefined | IProducts[];
  product: undefined | IProducts;
  headings:
    | {
        name: string;
        category: string;
        photo: string;
        price: string;
        stock: string;
        brand: string;
        expirationDate?: string;
        description?: string;
        barcode?: string;
        weight?: string;
        size?: string;
        createdAt?: string;
        updatedAt?: string;
      }
    | undefined;
};

const initialState: State = {
  products: undefined,
  product: undefined,
  headings: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductAction: (state, action: PayloadAction<IProducts | undefined>) => {
      state.product = action.payload;
    },
    updateProductAction: (state, action: PayloadAction<IProducts | undefined>) => {
      state.product = action.payload;
    },
    resetProductAction: (state) => {
      state.product = undefined;
    },
    getProductsAction: (state, action: PayloadAction<IProducts[] | undefined>) => {
      state.products = action.payload;
    },
    updateProductsAction: (state, action: PayloadAction<IProducts[] | undefined>) => {
      state.products = action.payload;
    },
    resetProductsAction: (state) => {
      state.products = undefined;
    },
    setHeadingsProductAction: (state, action: PayloadAction<State['headings'] | undefined>) => {
      state.headings = action.payload;
    },
    resetHeadingsProductAction: (state) => {
      state.headings = undefined;
    },
  },
});

export const {
  getProductAction,
  getProductsAction,
  updateProductAction,
  updateProductsAction,
  resetProductAction,
  resetProductsAction,
  setHeadingsProductAction,
  resetHeadingsProductAction,
} = productSlice.actions;
export default productSlice.reducer;
