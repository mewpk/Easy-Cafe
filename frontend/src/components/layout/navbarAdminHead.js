import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory, selectCategory } from "../adminComp/cateEditSlice";
import axios from "axios";

{/* ------------ Apichart : Update Tailwind Form 25/06/2022 ---------------------------- */ }

const NavbarAdminHead = () => {
  let dispatch = useDispatch();
  let state = useSelector((state) => state.anycate);
  let navigate = useNavigate();

  const fetchAllCategory = async () => {
    let result = await axios.get("users/allCategory");
    // console.log(result.data[0].isShow);
    const data = [];
    if (result.status === 200) {
      result.data.map((x) =>{
        console.log(x.isShow);
        if(x.isShow === 1){
          data.push(x);
        }
      })
      console.log(data);
      dispatch(getCategory(data));
    }
  };

  useEffect(() => {
    fetchAllCategory();

  }, []);


  // console.log(state.catygoryList);
  // state.catygoryList.map((x)=>{
  //   console.log(x.category_name);
  // })
  
  
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
                  navigate(`/admin/${x.category_name}`, { state: x.category_name });
                }}
              >
                {x.category_name}
              </button>
            ))}

        </div>
    </div>
  );
};

export default NavbarAdminHead;
