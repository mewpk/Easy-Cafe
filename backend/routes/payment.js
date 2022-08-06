const { default: axios } = require("axios");
var express = require("express");
const { send } = require("process");
const pool = require("../modules/poolConnection");
var router = express.Router();
var request = require("request-promise");
// const request = require("request-promise");
const crypto = require("crypto");
const UUID = require("uuid-v4");

const genHeader = (extension, body) => {
  //1. ใส่ channelSecret
  var channelSecret = "8714255d90ad83ffe6cc5ef0667602a6";
  var nonce = UUID();
  // console.log(nonce);
  const sigprepare = channelSecret + extension + JSON.stringify(body) + nonce;
  const signature = crypto
    .createHmac("SHA256", channelSecret)
    .update(sigprepare)
    .digest("base64")
    .toString();
  // console.log(signature);

  header = {
    "Content-Type": "application/json",
    //2. ใส่ ChannelId
    "X-LINE-ChannelId": "1657270670",
    "X-LINE-Authorization-Nonce": nonce,
    "X-LINE-Authorization": signature,
  };
  return header;
};
let header = "";
const doRequest = (body) => {
  //request api

  var baseUrl = "https://sandbox-api-pay.line.me";

  var extension = `/v3/payments/request`;
  // //1. ใส่ channelSecret
  // var channelSecret = "8714255d90ad83ffe6cc5ef0667602a6";
  // var nonce = UUID();
  // // console.log(nonce);
  // const sigprepare = channelSecret + extension + JSON.stringify(body) + nonce;
  // const signature = crypto
  //   .createHmac("SHA256", channelSecret)
  //   .update(sigprepare)
  //   .digest("base64")
  //   .toString();
  // // console.log(signature);

  // header = {
  //   "Content-Type": "application/json",
  //   //2. ใส่ ChannelId
  //   "X-LINE-ChannelId": "1657270670",
  //   "X-LINE-Authorization-Nonce": nonce,
  //   "X-LINE-Authorization": signature,
  // };

  return request({
    method: `POST`,
    uri: `${baseUrl}${extension}`,
    headers: genHeader(extension, body),
    body: JSON.stringify(body),
  });
};
//---------------------------------------confirmAPI---------------------------------------------------
router.post(
  "/v3/payments/:transactionId/confirm",
  async function (req, res, next) {
    // console.log("---", req.body);
    const url = `https://sandbox-api-pay.line.me/v3/payments/${req.params.transactionId}/confirm`; //edit
    // console.log("url", url);
    // console.log("header", header);
    // console.log(req.params.transactionId);
    // const order = await readDB(transactionId);
    // const body = {
    //   amount: order.amount,
    //   currency: order.currency,
    // };
    console.log("---------------------------------");

    try {
      const header = genHeader(
        `/v3/payments/${req.params.transactionId}/confirm`,
        req.body
      );
      const data = await request({
        method: "post",
        uri: url,
        body: req.body,
        headers: header,
        json: true,
      });
      console.log({ data, header });
      res.status(200).send(data);
    } catch (e) {
      console.log(e);
    }

    // request({
    //   method: "POST",
    //   uri: url,
    //   body: req.body,
    //   headers: header,
    //   json: true,
    // });
  }
);

//-----------------------------------------------------------------------------------------

router.post("/v3/payments/request", async function (req, res, next) {
  // console.log("resquestAPIBody", req.body);

  let bodyData = req.body;

  //   ส่ง body
  doRequest(bodyData)
    .then((data) => {
      // console.log(JSON.stringify(data));
      // console.log("check", data);
      res.status(200).send(JSON.stringify(data));
      // res.status(200).send(data);
    })
    .catch((e) => {
      console.log("Error", e);
    });
});
//----------------------------------------------------------------------------
router.get("/findAmount/:transactionId", async function (req, res, next) {
  // console.log("------");
  // console.log("findAmount", req.params.transactionId);
  try {
    let [rows, fields] = await pool.query(
      `SELECT * FROM beforeConfirmAPI WHERE beforeConfirmAPI.transactionId = "${req.params.transactionId}"`
    );

    // console.log(rows);
    res.status(200).send(rows);
  } catch (e) {
    console.log(e);
  }

  // let bodyData = req.body;
});

//1.----------------------------------------------------------------------------

router.post("/setTransactionId", async function (req, res, next) {
  let { transactionId, amount } = req.body;
  // console.log("settransactionId", transactionId);
  try {
    let [rows, fileds] = await pool.query(
      `INSERT INTO beforeConfirmAPI VALUES ("${transactionId}", ${amount})`
    );
    res.status(200).send(rows);
    // console.log("setTransationId", rows);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
