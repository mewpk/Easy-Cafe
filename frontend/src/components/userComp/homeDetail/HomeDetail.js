import React from "react";
import axios from "axios";
import Modal from "react-modal";
import NavbarFooter from "../../layout/navbarFooter";
import NavbarHeader from "../../layout/navbarHead";

import "./homeDetail.css";

import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { initHome, increaseMenuOrder, decreaseMenuOrder } from "../userSlice";
import { addOrder, updateCart, setIdAccount } from "../cartDetail/cartSlice";
import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";


const HomeDetail = () => {

  const navigate = useNavigate();
  let location = useLocation();
  let [price, setPrice] = useState("");
  let [validRadio, setValidRadio] = useState(false);

  const [amount, setAmount] = useState(0);
  const { pageCat } = useParams();

  const state = useSelector((state) => state.user);
  const state1 = useSelector((state) => state.category);
  const state2 = useSelector((state) => state.cart);
  const id_account = useSelector((state) => state.authen.id_account);
  const dispatch = useDispatch();

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#black",
    },
  };

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  //end modal

  useEffect(() => {
    //console.log("test", pageCat);
    const initFunc = async () => {
      let result = await axios.get(`/users/home/${pageCat}`);
      // console.log(result);
      if (result.status === 200) {
        dispatch(initHome(result.data));
      }
    };
    initFunc();
  }, [pageCat]);

  // เมื่อลูกกดปุ่ม ADD order
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("prc", price);
    let total = e.target.quantity.value * price;
    // console.log("total", total);

    if (!validRadio) {
      setModalIsOpenToTrue(); //แสดง modal
    } else {
      // console.log("Success:", e.target.drinkType.value);
      // console.log("Success:", e.target.productName.value);
      // console.log("Success:", e.target.quantity.value);

      // // console.log("IDDD", lineId);
      let result = await axios.post("/users/cart", {
        id_account: id_account,
        drinkType: e.target.drinkType.value, //type
        productName: e.target.productName.value,
        quantity: e.target.quantity.value, //amount_cup
        total: total,
        status_pay: "wait", //status_pay
      });
      dispatch(setIdAccount(id_account));
      console.log("idIncart", result);
      if (result) {
        dispatch(
          updateCart({
            drinkType: e.target.drinkType.value,
            productName: e.target.productName.value,
            quantity: e.target.quantity.value,
            total: total,
            id_cart: result.data.insertId,
            id_product: result.data.id_product,
          })
        );
      }

      setValidRadio(false);
      navigate("/cart");
    }
  };

  return (
    <>
      <NavbarHeader/>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <p>please select the drink type!</p>
        <button
          onClick={setModalIsOpenToFalse}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          close
        </button>
      </Modal>
      <div
        className="mt-32 pd-16"
        style={{ paddingTop: "100px", padding: "10px", paddingBottom: "20px" }}
      >
        {state.order && //[{},{},{}]
          state.order.map((x, index) => (
            <div className="mt-0 sm:mt-0 rounded-lg">
              <div className="md:grid md:grid-cols-1 md:gap-10">
                <div className="px-0 mt-2 md:mt-0 md:col-span-2 ">

                  <form action="#" onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded-lg bg-home">
                      <div className="px-4 py-3 space-y-2 sm:p-6 ">
                        <fieldset>
                          <legend className="contents text-xl font-large text-white uppercase">
                            {x.product_name}
                          </legend>
                          <input
                            type="hidden"
                            name="productName"
                            value={x.product_name}
                          />

                          <table>
                            <tr>
                              <td>
                                <img
                                  style={{
                                    margin: "30px 10px",
                                    borderRadius: "10px",
                                  }}
                                  width="150px"
                                  height="150px"
                                  src={`http://localhost:3000/static/pic/${x.product_photo}`}
                                ></img>
                              </td>
                              <td>
                                <div className="mt-4 space-y-4">
                                  <div className="flex items-center">
                                    {x.hot_price ? (
                                      <>
                                        <input
                                          id="push-everything"
                                          name="drinkType"
                                          value="hot"
                                          type="radio"
                                          onClick={() => {
                                            setPrice(x.hot_price);
                                            setValidRadio(true);
                                          }}
                                          className="focus:ring-green-800 h-4 w-4 text-green-800 border-gray-300"
                                        />
                                        <label
                                          htmlFor="hot"
                                          className="ml-3 block text-sm font-medium text-white"
                                        >
                                          HOT {x.hot_price} BAHT
                                        </label>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="flex items-center">
                                    {x.iced_price ? (
                                      <>
                                        <input
                                          id="push-everything"
                                          name="drinkType"
                                          value="iced"
                                          type="radio"
                                          onClick={() => {
                                            setValidRadio(true);
                                            setPrice(x.iced_price);
                                          }}
                                          className="focus:ring-green-800 h-4 w-4 text-green-800 border-gray-300"
                                        />
                                        <label
                                          htmlFor="iced"
                                          className="ml-3 block text-sm font-medium text-white"
                                        >
                                          ICED {x.iced_price} BAHT
                                        </label>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="flex items-center">
                                    {x.frappe_price ? (
                                      <>
                                        <input
                                          id="push-everything"
                                          name="drinkType"
                                          value="frappe"
                                          type="radio"
                                          onClick={() => {
                                            setPrice(x.frappe_price);
                                            setValidRadio(true);
                                          }}
                                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                          htmlFor="frappe"
                                          className="ml-3 block text-sm font-medium text-white"
                                        >
                                          FRAPPE {x.frappe_price} BAHT
                                        </label>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                      <tr>
                                        <td>
                                      <button
                                        type="button"
                                        className="inline-flex justify-center py-.5 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() =>
                                          dispatch(decreaseMenuOrder(index))
                                        }
                                      >
                                        -
                                      </button>
                                      </td>
                                      
                                      <td>
                                      <p style={{ color: "white", padding: '0px 20px 0px 20px' }}>{x.quantity}</p>
                                      </td>

                                      <td>
                                      <input
                                        type="hidden"
                                        name="quantity"
                                        value={x.quantity}
                                      />
                                      </td>
                                      <td>
                                      <button
                                        type="button"
                                        className="inline-flex justify-center py-.5 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() =>
                                          dispatch(increaseMenuOrder(index))
                                        }
                                      >
                                        +
                                      </button>
                                      </td>
                                      </tr>
                                  </div>


                                </div>
                              </td>
                            </tr>
                          </table>
                        </fieldset>
                      </div>
                      <div className="px-4 py-3 text-center sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
          
      </div>
      <NavbarFooter />
    </>
  );
};

export default HomeDetail;
