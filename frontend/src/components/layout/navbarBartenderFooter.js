import React from "react";
import icon_home from "../image/icon_home.png";
import icon_success from "../image/icon_success.png";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import "./navbar.css";


function NavbarBartenderFooter() {

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
              <Link to={"/bartender"}>
                <img src={icon_home} width="80px" />
              </Link>
            </div>

            <div className="menufooter">
              <Link to={"/bartender/success"}>
                <img src={icon_success} width="80px" />
              </Link>
            </div>

          </div>
        </div>



</div>
)}

export default NavbarBartenderFooter;