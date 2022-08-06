import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo1 from "../image/logop2.gif";
import logo2 from "../image/eazycafe.gif";



const LayoutComp = () => {
  const location = useLocation();
  return (
    <div>
      {console.log(location)}
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          zIndex: 100,
          margin: "0% auto",
          width: "100%",
          opacity: 1,
        }}
      >
        <div className="flex-container-head">

          <li type="none" style={{ textAlign: "center", paddingTop: "0px" }}>
            <div
              style={{
                backgroundColor: "#252525",
                width: "100px",
                height: "100px",
              }}
            >
                <img src={logo1} width="80px" />
            </div>
          </li>

          <li type="none" style={{ textAlign: "left", paddingTop: "0px" }}>
            <div
              style={{
                backgroundColor: "#252525",
                width: "328px",
                height: "70px",
              }}
            >
              <img src={logo2} width="250px" />
            </div>
          </li>
        </div> 
      </div>

      {/* {location.pathname == "/" ? <div><img src={logo1}></img></div> : <Outlet />} */}
      <Outlet />
    </div>
  );
};

export default LayoutComp;
