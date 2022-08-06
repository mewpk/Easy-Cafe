import { createSlice } from "@reduxjs/toolkit";

export const cateEditSlice = createSlice({
  name: "anycate",
  initialState: {
    anycate: [],//list All
    catygoryList: [],//list show status 1
    selectedCategory: "",//select nav
  },
  reducers: {
    initEditCate: (state, action) => {//list All ใช้หน้า show all for edit delete
      console.log(action.payload);
      state.anycate = action.payload;
    },
    getCategory:(state, action) =>{//list show status 1
      state.catygoryList = action.payload;
      // console.log(state.catygoryList);
    },
    selectCategory:(state, action) =>{
      state.selectedCategory = action.payload;
      // console.log(state.selectedCategory);
    },
    toggleShow:(state, action) =>{
      state.catygoryList.map((x)=>{
        if(x.id_category == action.payload){
          return {
            id_category: x.id_category,
            show: !x.isShow,
            category_name: x.category_name,
          }        
        }else{
          return x;
        }
      })
    }
  },
});

// Action creators are generated for each case reducer function
export const { initEditCate, getCategory, selectCategory, toggleShow} = cateEditSlice.actions;

export default cateEditSlice.reducer;
