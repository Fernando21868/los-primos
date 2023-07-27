import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../interfaces/types';

type State = {
  category: undefined | ICategories;
  categories: undefined | ICategories[];
};

const initialState: State = {
  category: undefined,
  categories: undefined,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoryAction: (state, action: PayloadAction<ICategories | undefined>) => {
      state.category = action.payload;
    },
    updateCategoryAction: (state, action: PayloadAction<ICategories | undefined>) => {
      state.category = action.payload;
    },
    getCategoriesAction: (state, action: PayloadAction<ICategories[] | undefined>) => {
      state.categories = action.payload;
    },
    updateCategoriesAction: (state, action: PayloadAction<ICategories[] | undefined>) => {
      state.categories = action.payload;
    },
    resetCategoriesAction: (state) => {
      state.categories = undefined;
    },
  },
});

export const {
  getCategoryAction,
  updateCategoryAction,
  getCategoriesAction,
  updateCategoriesAction,
  resetCategoriesAction,
} = categorySlice.actions;
export default categorySlice.reducer;
