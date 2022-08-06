import React from "react";
import icon_home from "../image/icon_home.png";
import icon_product from "../image/icon_product.png";
import icon_category from "../image/icon_category.png";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import "./navbar.css";


function NavbarAdminFooter() {

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
              <Link to={"/admin/coffee"}>
                <img src={icon_home} width="80px" />
              </Link>
            </div>

            <div className="menufooter">
              <Link to={"/admin/addProduct"}>
                <img src={icon_product} width="80px" />
              </Link>
            </div>

            <div className="menufooter">
              <Link to={"/admin/editCategory"}>
                <img src={icon_category} width="90px" />
              </Link>
            </div>

          </div>
        </div>



</div>
)}

export default NavbarAdminFooter;