import React from "react";
import icon_home from "../image/icon_home.png";
import icon_cart from "../image/icon_cart.png";
import icon_profile from "../image/icon_profile.png";
import icon_notify from "../image/icon_notify.png";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import "./navbar.css";


function NavbarFooter() {

return(

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

            <div className="menufooter">
              <Link to={"/coffee"}>
                <img src={icon_home} width="80px" />
              </Link>
            </div>

            <div className="menufooter">
              <Link to={"/userprofile"}>
                <img src={icon_profile} width="80px" />
              </Link>
            </div>

            <div className="menufooter">
              <Link to={"/cart"}>
                <img src={icon_cart} width="80px" />
              </Link>
            </div>
{/* 
            <div className="menufooter">
                <Link to={'#'}>
                <img src={icon_notify} width="80px" />
              </Link>
            </div> */}

          </div>
        </div>
</div>
)}

export default NavbarFooter;