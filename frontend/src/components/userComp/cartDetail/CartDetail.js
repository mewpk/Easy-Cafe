import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../layout/navbarHead";
import NavbarFooter from "../../layout/navbarFooter";
import {
  deleteOrderInCart,
  setTotal,
} from "../cartDetail/cartSlice";
import { createBodyRequestAPI, setFalseReadyToPayment } from "./paymentSlice";
const LosslessJSON = require("lossless-json");

const CartDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let allCartSlice = useSelector((state) => state.cart);
  let orderInCart = useSelector((state) => state.cart.orderInCart);
  let id_account = useSelector((state) => state.authen.id_account);
  let total = useSelector((state) => state.cart.total);

  let bodyRequestAPI = useSelector((state) => state.payment.bodyRequestAPI);
  let readyToPay = useSelector((state) => state.payment.readyToPayment);
  const [click, setClick] = useState(false);

  console.log("orderInCart", orderInCart);

  const onClickDelete = async (e, values) => {
    e.preventDefault();
    // console.log("valuesdelete", values);
    dispatch(deleteOrderInCart(values));
    let result = await axios.delete("/users/deleteOrder", {
      headers: { productName: values },
    });
  };

  const onClickEdit = async (e, values) => {
    e.preventDefault();
    // console.log("values", values);

    // let result = await axios.put("/users/editUserCart");
    navigate("/editUserCart", { state: values });
  };

  const calTotal = () => {
    const total = orderInCart.reduce(
      (previousValue, currentValue) => previousValue + currentValue.total,
      0
    );
    dispatch(setTotal(total));
    return total;
  };
  const onClickPayNow = async () => {
    dispatch(createBodyRequestAPI(allCartSlice));
    setClick(true);
  };

  const handlePay = async (body) => {
    setClick(false);
    // console.log("test----");

    const response = await axios.post("/payment/v3/payments/request", body);
    console.log("response", response);

    const result = LosslessJSON.parse(response.data);
    // console.log("responseREQUESTAPI", result.info.transactionId.value);
    // console.log("responseREQUESTAPI-2", result.info.paymentUrl.web);

    const result2 = await axios.post("/payment/setTransactionId", {
      transactionId: result.info.transactionId.value,
      amount: bodyRequestAPI.amount,
    });
    // console.log("111", result.info);
    // console.log("222", result2);

    //เปิดหน้าใหม่
    // window.open(`${result.info.paymentUrl.web}`, "_blank").focus();
    // window.open(result.info.paymentUrl.web);

    // navigate(`${result.info.paymentUrl.web}`);
    window.location.replace(result.info.paymentUrl.web);
    // window.location = result.info.paymentUrl.web;
  };

  useEffect(() => {
    if (Object.keys(bodyRequestAPI).length > 0 && click && readyToPay) {
      handlePay(bodyRequestAPI);
      dispatch(setFalseReadyToPayment());

      localStorage.setItem("finalOrder", JSON.stringify(orderInCart));
      localStorage.setItem("id_account", id_account);
      localStorage.setItem("total", total);
    }
  }, [readyToPay]);

  return (
    <div>
    <NavbarHeader />

    <div className="pt-32 pb-16">
    <div className="px-2.5 mt-2 md:mt-0 md:col-span-2">
    <div className="px-2 py-3 shadow  rounded-lg bg-home overflow-hidden">
    <div className="contents text-xl font-large text-white uppercase">
      <p className="mt-50 text-center">invoice</p>
    </div>
   
      {orderInCart &&
        orderInCart.map((x) => (
          <div className="mt-2 sm:mt-5">
            <div className="md:grid md:grid-cols-1 md:gap-10">
              {/* <div className="px-2.5 mt-2 md:mt-0 md:col-span-2"> */}
                {/* <div className="px-2 py-3 shadow  rounded-lg bg-home overflow-hidden"> */}

                  <div className="contents text-base text-white uppercase">
                    <table className="w-full text-center mt-3 mb-5">
                      <tr>
                        <td>
                          <p> product </p>
                        </td>
                        <td>
                          <p> Type </p>
                        </td>
                        <td>
                          <p> quantity </p>
                        </td>
                        <td>
                          <p> Price </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>{x.productName}</p>
                        </td>
                        <td>
                          <p>{x.drinkType}</p>
                        </td>
                        <td>
                          <p>{x.quantity} </p>
                        </td>
                        <td>
                          <p>{x.total}</p>
                        </td>
                      </tr>
                    </table>

                    <table className="w-full text-center mt-3 mb-3">
                      <tr>
                        <td>
                          <button
                            type="submit"
                             onClick={(e) => onClickEdit(e, x)}
                            className=" py-2 px-4 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            EDIT
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            onClick={(e) => onClickDelete(e, x.id_cart)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            // </div>
          // </div>
        ))}
        <div className="px-2.5 ">
      <div className="w-full text-center rounded-lg bg-home mt-1 pb-20">
        <div className="text-white mt-2 ">
          <p className="text-white pt-10 pb-5 mt-2 ">
            Total : <b>{calTotal()}</b> BAHT
          </p>
          <button
            onClick={() => onClickPayNow()}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div></div></div>
    </div>

    <NavbarFooter />
  </div>

  );
};

export default CartDetail;
