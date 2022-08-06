import React from "react";
import logo1 from "../../image/logop2.gif";
import logo2 from "../../image/eazycafe.gif";
import icon_home from "../../image/icon_home.png";
import icon_cart from "../../image/icon_cart.png";
import icon_profile from "../../image/icon_profile.png";
import icon_notify from "../../image/icon_notify.png";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import Context from "../../../AuthenContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory, selectCategory } from "../../adminComp/cateEditSlice";
import axios from "axios";

const Navbar = () => {
  let dispatch = useDispatch();
  let state = useSelector((state) => state.anycate);
  let navigate = useNavigate();

  const fetchAllCategory = async () => {
    let result = await axios.get("users/allCategory");
    // console.log(result.data[0].isShow);
    const data = [];
    if (result.status === 200) {
      result.data.map((x) =>{
        // console.log(x.isShow);
        if(x.isShow == 1){
          data.push(x);
        }
      })
      // console.log(data);
      dispatch(getCategory(data));
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  // console.log(state.catygoryList);

  return (
    <div>
      {/* ---------------------------------------------------NavbarHead------------------------------------------------------------------- */}
      <div className="flex-container-nav"         
      style={{
        position: "fixed",
        top: "90px",
        left: "0px",
        zIndex: 100,
        margin: "0% auto",
        width: "100%",
        opacity: 1,
      }} >

        {state.catygoryList &&
          state.catygoryList.map((x) => (
            <button
              className="button-30 uppercase"
              role="button"
              onClick={() => {
                dispatch(selectCategory(x.category_name));
                navigate(`/${x.category_name}`, { state: x.category_name });
              }}
            >
              {x.category_name}
            </button>
          ))
        }

      </div>


      {/* ------------------------------------Footer Menu------------------------------------ */}

      <div
        style={{
          position: "fixed",
          bottom: "-10px",
          zIndex: 100,
          margin: "0% auto",
          width: "100%",
          opacity: 1,
          textAlign: "center",
        }}
      >
        <div className="flex-container-2">
          <div className="navbarfooter">
            <tr textAlign={"center"}>
              <td className="menufooter">
                <Link to={"/coffee"}>
                  <img src={icon_home} width="80px" />
                </Link>
              </td>

              <td className="menufooter">
                <Link to={"/userProfile"}>
                  <img src={icon_profile} width="80px" />
                </Link>
              </td>

              <td className="menufooter">
                <Link to={"/cart"}>
                  <img src={icon_cart} width="80px" />
                </Link>
              </td>
              <td className="menufooter">
                <img src={icon_notify} width="80px" />
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
