import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "product",
    initialState:{
        product: [],
    },

    reducers:{
        initProduct:(state, action)=>{
            state.product = action.payload;
            // console.log(action.payload);
        }
    }
})

export const { initProduct, categorySelect } = adminSlice.actions;
export default adminSlice.reducer