import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-modal";
import NavbarFooter from "../../layout/navbarFooter";
import NavbarHeader from "../../layout/navbarHead";

import {
  updateCart,
  deleteOrderInCart,
  setCurrentEditMenu,
  increaseEditOrder,
  decreaseEditOrder,
  setIdCart,
  setEditedType,
  updateOrderAfterEdited,
} from "../cartDetail/cartSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const EditUserCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let [price, setPrice] = useState("");

  let orderInCart = useSelector((state) => state.cart.orderInCart);
  let currentEditOrder = useSelector((state) => state.cart.currentEditOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LO", location.state.id_cart);
    dispatch(setIdCart(location.state.id_cart));

    const currentMenu = async () => {
      const result = await axios.post("/users/currentEditOrder", {
        currentMenu: location.state,
      });
      console.log("result", result);

      if (result.status === 200) {
        dispatch(setCurrentEditMenu(result.data));
      }
    };
    currentMenu();
  }, []);
  console.log("m", currentEditOrder);

  //modal
  let [validRadio, setValidRadio] = useState(false);

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
  //   end modal

  // เมื่อลูกกดปุ่ม EDIT order
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("e.target", e.target.drinkType.value);
    dispatch(setEditedType(e.target.drinkType.value));

    if (!validRadio) {
      setModalIsOpenToTrue(); //แสดง modal
      // alert("please select type of drink");
    } else {

      let editData = {
        id_cart: location.state.id_cart,
        drinkType: e.target.drinkType.value,
        quantity: e.target.quantity.value,
        total: e.target.quantity.value * price,
      };

      dispatch(updateOrderAfterEdited(editData));

      if (currentEditOrder.editedType) {
        let result = await axios.put("/users/editOrderAgain", {
          state: currentEditOrder,

        });

        setValidRadio(false);
      }
      navigate("/cart");
    }
  };

  return (
    <><NavbarHeader/>
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
        className="mt-32 mb-35 text-white"
        style={{ paddingTop: "100px", padding: "10px" }}
      >
        {currentEditOrder.product && (
          <div className="mt-2 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-1">
              <div className="mt-2 rounded-lg bg-home md:mt-0 md:col-span-2">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 space-y-2 sm:p-6">
                      <fieldset>
                        <legend className="contents text-xl font-large text-white uppercase">
                          {currentEditOrder.product[0].product_name}
                        </legend>
                        <input
                          type="hidden"
                          name="productName"
                          value={currentEditOrder.product[0].product_name}
                        />

                        <table>
                          <tr>
                            <td>
                              <img
                                style={{
                                  margin: "30px 30px 30px 0px",
                                  borderRadius: "10px",
                                }}
                                width="120px"
                                height="120px"
                                src={`http://localhost:3000/static/pic/${currentEditOrder.product[0].product_photo}`}
                              ></img>
                            </td>
                            <td>
                              <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                  {currentEditOrder.product[0].hot_price ? (
                                    <>
                                      <input
                                        id="push-everything"
                                        name="drinkType"
                                        value="hot"
                                        type="radio"
                                        onClick={() => {
                                          setPrice(
                                            currentEditOrder.product[0]
                                              .hot_price
                                          );
                                          setValidRadio(true);
                                        }}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                      />
                                      <label
                                        htmlFor="hot"
                                        className="ml-3 block text-sm font-medium text-white"
                                      >
                                        HOT{" "}
                                        {currentEditOrder.product[0].hot_price}{" "}
                                        BAHT
                                      </label>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  {currentEditOrder.product[0].iced_price ? (
                                    <>
                                      <input
                                        id="push-everything"
                                        name="drinkType"
                                        value="iced"
                                        type="radio"
                                        onClick={() => {
                                          setValidRadio(true);
                                          setPrice(
                                            currentEditOrder.product[0]
                                              .iced_price
                                          );
                                        }}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                      />
                                      <label
                                        htmlFor="iced"
                                        className="ml-3 block text-sm font-medium text-white"
                                      >
                                        ICED
                                        {currentEditOrder.product[0].iced_price}
                                        BAHT
                                      </label>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  {currentEditOrder.product[0].frappe_price ? (
                                    <>
                                      <input
                                        id="push-everything"
                                        name="drinkType"
                                        value="frappe"
                                        type="radio"
                                        onClick={() => {
                                          setPrice(
                                            currentEditOrder.product[0]
                                              .frappe_price
                                          );
                                          setValidRadio(true);
                                        }}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                      />
                                      <label
                                        htmlFor="frappe"
                                        className="ml-3 block text-sm font-medium text-white"
                                      >
                                        FRAPPE{" "}
                                        {
                                          currentEditOrder.product[0]
                                            .frappe_price
                                        }{" "}
                                        BAHT
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
                                            dispatch(decreaseEditOrder())
                                          }
                                        >
                                          -
                                        </button>
                                      </td>
                                      <td>
                                        <p style={{ color: "white" }}>
                                          {currentEditOrder.product[1] &&
                                            currentEditOrder.product[1]
                                              .amount_cup}
                                        </p>
                                      </td>
                                      <td>
                                        <input
                                          type="hidden"
                                          name="quantity"
                                          value={
                                            currentEditOrder.product[1] &&
                                            currentEditOrder.product[1]
                                              .amount_cup
                                          }
                                        />
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="inline-flex justify-center py-.5 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          onClick={() =>
                                            dispatch(increaseEditOrder())
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

                    <div className="px-4 mb-10 py-0 text-center sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        EDIT
                      </button>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
      </div>
      <NavbarFooter />
    </>
  );
};
export default EditUserCart;
