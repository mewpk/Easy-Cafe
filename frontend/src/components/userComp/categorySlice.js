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
    toggleShow: (state, action) => {
      for (let i = 0; i < state.categoryAll.length; i++) {
        if (state.categoryAll[i].id_category == action.payload) {
          state.categoryAll[i].isShow = state.categoryAll[i].isShow == 1 ? 0 : 1;
          break;
        }

      }
    },
  }
  });

// Action creators are generated for each case reducer function
export const { initAllCategory, getCurrentCategory, setCurrentCategory, toggleShow } =
  categorySlice.actions;

export default categorySlice.reducer;
