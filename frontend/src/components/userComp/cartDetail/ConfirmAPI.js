import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { queryParams } from "../../../utils/StringUtils";
import { useSelector } from "react-redux";

const ConfirmAPI = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const line_id = useSelector((state) => {
    // console.log(state.authen.data);
    return state.authen.data?.line_id;
  });

  // console.log("location", location.search);
  const updateToken = async (code, state, line_id) => {
    let result = await axios.put("/lineNotify/updateUserToken", {
      code,
      state,
      line_id,
    });
  };

  useEffect(() => {
    const { transactionId, code, state } = queryParams(location.search);

    //console.log({ code, state, line_id });
    if (code && state && line_id) {
      // console.log(line.line_id);
      updateToken(code, state, line_id);
    }

    let conFirmAPIFunc = async () => {
      let res = await axios.get(`payment/findAmount/${transactionId}`);
      console.log("res.data", res.data[0]);

      let res2 = await axios.post(
        `payment/v3/payments/${res.data[0].transactionId}/confirm`,
        {
          amount: res.data[0].amount,
          currency: "THB",
        }
      );
      if (res2.data.returnCode == "0000") {
        //console.log("mmms", res2.data);

        let initData = JSON.parse(localStorage.getItem("finalOrder") || "[]");
        let id_account = localStorage.getItem("id_account");
        let total = localStorage.getItem("total");

        const setOrderAndHistoryTable = async () => {
          const res = await axios.post("bartenders/setOrderAndHistoryTable", {
            initData,
            id_account,
            total,
          });
        };
        setOrderAndHistoryTable();
      }
    };
    conFirmAPIFunc();
  }, [line_id]);

  return (
    <div
      style={{ padding: "0px 20px", justifyContent: "center", display: "flex" }}
    >
      <button
        style={{
          background: "green",
          marginTop: "400px",
          color: "white",
          border: "1px solid white",
          padding: "10px 30px",
          borderRadius: "10px",
        }}
        onClick={() => navigate("/coffee")}
      >
        order Again
      </button>
      <br />
      <a
        style={{
          background: "green",
          marginTop: "400px",
          color: "white",
          border: "1px solid white",
          padding: "10px 30px",
          borderRadius: "10px",
        }}
        href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=P3KIXdijxSmekYZgBaCu1J&redirect_uri=https://1356-2405-9800-b960-ceb0-24a6-d7c3-e3b0-826a.ap.ngrok.io/confirm&scope=notify&state=	
        3tq6MK7uXSF6vSelT3Ych0TwC8DZd0oPDS0bjhu4TSF"
      >
        รับการแจ้งเตือนผ่าน LINE Notify
      </a>
    </div>
  );
};

export default ConfirmAPI;
