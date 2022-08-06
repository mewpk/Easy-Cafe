import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location.search);
  // const words = str.split("=");
  // const transactionId = parseInt(words[1]);
  // console.log(transactionId);

  return (
    <div className="bgstart">
      <div>
        <button
          style={{
            background: "green",
            color: "white",
            border: "1px solid white",
            padding: "10px 30px",
            borderRadius: "10px",
          }}
          onClick={() => navigate("/coffee")}
        >
          START TO ORDER
        </button>
      </div>
    </div>

    // <div
    //   style={{ padding: "0px 20px", justifyContent: "center", display: "flex" }}
    // >
    //   <button
    //     style={{
    //       background: "green",
    //       marginTop: "400px",
    //       //   marginLeft: "50%",
    //       color: "white",
    //       border: "1px solid white",
    //       padding: "10px 30px",
    //       borderRadius: "10px",
    //     }}
    //     onClick={() => navigate("/coffee")}
    //   >
    //     start
    //   </button>
    // </div>
  );
};

export default Start;
