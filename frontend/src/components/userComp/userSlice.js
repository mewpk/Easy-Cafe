import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    order: [],
  },
  reducers: {
    initHome: (state, action) => {
      // console.log(action.payload);
      let res = action.payload.map((x) => {
        x.quantity = 1;
        return x;
      });
      // console.log(res);
      state.order = res;
    },
    increaseMenuOrder: (state, action) => {
      // console.log(action.payload);
      state.order[action.payload].quantity += 1;
    },
    decreaseMenuOrder: (state, action) => {
      if (state.order[action.payload].quantity > 0) {
        state.order[action.payload].quantity -= 1;
      }
    },
    // getOrder: (state) => {
    //   return state.order;
    // },
    // addOrder: (state, payload) => {
    //   state.value += 1;
    // },
    // deleteOrder: (state, payload) => {
    //   state.value += 1;
    // },
    // editOrder: (state, payload) => {
    //   state.value += 1;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { initHome, increaseMenuOrder, decreaseMenuOrder } =
  userSlice.actions;

export default userSlice.reducer;
