import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    //เก็บค่าที่ลูกค้ากด ADD มาจากหน้า homeDetail
    id_account: null,
    orderInCart: [],
    total: null,
    //เก็บ order menu ที่ลูกค้ากด edit
    currentEditOrder: { id_cart: "", product: [{}], editedType: "" },
  },
  reducers: {
    //เก็บค่าที่ลูกค้ากด ADD มาจากหน้า homeDetail
    updateCart: (state, action) => {
      // console.log(action.payload);
      state.orderInCart.push(action.payload);
    },

    setIdAccount: (state, action) => {
      state.id_account = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    deleteOrderInCart: (state, action) => {
      // console.log(action.payload);
      state.orderInCart = state.orderInCart.filter(
        (x) => x.id_cart != action.payload
      );
    },
    setIdCart: (state, action) => {
      // console.log(action.payload);
      state.currentEditOrder.id_cart = action.payload;
    },

    setEditedType: (state, action) => {
      // console.log(action.payload);
      state.currentEditOrder.editedType = action.payload;
    },

    setCurrentEditMenu: (state, action) => {
      // let res = { ...action.payload, quantity: 1 };
      // console.log("newRes", res);

      // console.log("currentEditpayload", action.payload);
      state.currentEditOrder.product = action.payload;
    },

    increaseEditOrder: (state) => {
      // console.log(action.payload);
      state.currentEditOrder.product[1].amount_cup += 1;
    },
    decreaseEditOrder: (state) => {
      if (state.currentEditOrder.product[1].amount_cup > 0) {
        state.currentEditOrder.product[1].amount_cup -= 1;
      }
    },

    updateOrderAfterEdited: (state, action) => {
      console.log("editData", action.payload);
      state.orderInCart = state.orderInCart.map((x) => {
        if (x.id_cart === action.payload.id_cart) {
          x.drinkType = action.payload.drinkType;
          x.quantity = action.payload.quantity;
          x.total = action.payload.total;

          return x;
        } else {
          return x;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCart,
  deleteOrderInCart,
  setCurrentEditMenu,
  increaseEditOrder,
  decreaseEditOrder,
  setIdCart,
  setEditedType,
  updateOrderAfterEdited,
  setIdAccount,
  setTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
