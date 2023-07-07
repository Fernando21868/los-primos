import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../pagesAdmin/list/types';

type State = {
  category: undefined | ICategories;
  loading: boolean;
  headings:
    | {
        nameCategory: string;
        description: string;
        photo: string;
        createdAt?: string;
        updatedAt?: string;
      }
    | undefined;
};

const initialState: State = {
  category: undefined,
  loading: false,
  headings: undefined,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryAction: (state) => {
      state.loading = true;
    },
    getCategoryAction: (state, action: PayloadAction<ICategories | undefined>) => {
      state.category = action.payload;
      state.loading = false;
    },
    updateCategoryAction: (state, action: PayloadAction<ICategories | undefined>) => {
      state.category = action.payload;
      state.loading = false;
    },
    resetCategoryAction: (state) => {
      state.category = undefined;
      state.loading = true;
    },
    setHeadingsCategoryAction: (state, action: PayloadAction<State['headings'] | undefined>) => {
      state.headings = action.payload;
    },
    resetHeadingsCategoryAction: (state) => {
      state.headings = undefined;
    },
  },
});

export const {
  categoryAction,
  getCategoryAction,
  updateCategoryAction,
  resetCategoryAction,
  setHeadingsCategoryAction,
  resetHeadingsCategoryAction,
} = categorySlice.actions;
export default categorySlice.reducer;
