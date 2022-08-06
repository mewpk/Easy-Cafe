import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryAll: [],
    selectedCategory: "",
  },
  reducers: {
    initAllCategory: (state, action) => {
      state.categoryAll = action.payload;
    },
    getCurrentCategory: (state) => {
      return state.selectedCategory;
    },
    setCurrentCategory: (state, action) => {
      state.selectedCategory = action.payload.selected;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initAllCategory, getCurrentCategory, setCurrentCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
