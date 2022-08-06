import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";
import cartReducer from "./cartDetail/cartSlice";
import authenReducer from "../login/authenSlice";
// import editCartReducer from "./editCartDetail/editCartSlice";
import productReducers from "../adminComp/EditProduct/productSlice";
import paymentReducer from "./cartDetail/paymentSlice";
import productHomeReducer from "../adminComp/adminSlice";
import anycateReducer from "../adminComp/cateEditSlice";


export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
    authen: authenReducer,
    // editCart: editCartReducer,
    payment: paymentReducer,
    products: productReducers,
    product: productHomeReducer,
    anycate: anycateReducer,
  },
});
