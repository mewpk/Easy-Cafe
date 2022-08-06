import { createSlice } from "@reduxjs/toolkit";

export const authenSlice = createSlice({
  name: "authen",
  initialState: {
    id_account: "",
    data: null,
    role: "",
    orderNowOrAgain: "orderNow",
  },
  reducers: {
    //เมื่อกดปุ่ม login
    initData: (state, action) => {
      state.data = action.payload;
    },
    setIdAccount: (state, action) => {
      state.id_account = action.payload;
    },

    //BN เช็ค DB และส่ง Role กลับมา
    setRole: (state, action) => {
      state.role = action.payload;
    },
    orderNowOrAgain: (state, action) => {
      console.log("order", action.payload);
      state.orderNowOrAgain = action.payload;
    },
  },
});

export default authenSlice.reducer;

export const { initData, setIdAccount, setRole, orderNowOrAgain } =
  authenSlice.actions;
