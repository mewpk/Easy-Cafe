import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    // selectedCategory: "",
  },
  reducers: {
    initProductsEdit: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initProductsEdit } =
productsSlice.actions;

export default productsSlice.reducer;
