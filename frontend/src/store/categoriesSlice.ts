import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../pagesAdmin/list/types';

type State = {
  categories: undefined | ICategories[];
  loading: boolean;
};

const initialState: State = {
  categories: undefined,
  loading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesAction: (state) => {
      state.loading = true;
    },
    getCategoriesAction: (state, action: PayloadAction<ICategories[] | undefined>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    updateCategoriesAction: (state, action: PayloadAction<ICategories[] | undefined>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    resetCategoriesAction: (state) => {
      state.categories = undefined;
      state.loading = true;
    },
  },
});

export const {
  categoriesAction,
  getCategoriesAction,
  updateCategoriesAction,
  resetCategoriesAction,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
