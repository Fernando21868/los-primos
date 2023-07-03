import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../pagesAdmin/list/types';

type State = {
  category: undefined | ICategories;
  loading: boolean;
};

const initialState: State = {
  category: undefined,
  loading: false,
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
  },
});

export const { categoryAction, getCategoryAction, updateCategoryAction, resetCategoryAction } =
  categorySlice.actions;
export default categorySlice.reducer;
