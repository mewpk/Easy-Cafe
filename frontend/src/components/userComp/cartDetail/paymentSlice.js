import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    bodyRequestAPI: {},
    readyToPayment: false,
  },
  reducers: {
    createBodyRequestAPI: (state, action) => {
      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }

      const setProduct = action.payload.orderInCart.map((x) => ({
        name: x.productName,
        quantity: x.quantity,
        price: x.total / parseInt(x.quantity),
      }));
      console.log("setProduct", setProduct);

      state.bodyRequestAPI = {
        amount: action.payload.total,
        currency: "THB",
        orderId: makeid(5),
        packages: [
          {
            id: makeid(5),
            amount: action.payload.total,
            name: "easy cafe",
            products: setProduct,
          },
        ],
        redirectUrls: {
          confirmUrlType: "CLIENT",
          confirmUrl: "https://1356-2405-9800-b960-ceb0-24a6-d7c3-e3b0-826a.ap.ngrok.io/confirm",
          cancelUrl:
            "https://w7.pngwing.com/pngs/52/84/png-transparent-no-symbol-icon-cancel-s-angle-text-symmetry-thumbnail.png",
        },
      };
      state.readyToPayment = true;
    },
    setFalseReadyToPayment: (state, action) => {
      state.readyToPayment = false;
    },
  },
});

export const { createBodyRequestAPI, setFalseReadyToPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
