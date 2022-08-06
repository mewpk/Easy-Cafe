var express = require("express");
var router = express.Router();
const pool = require("../modules/poolConnection");
const axios = require("axios");
var qs = require("qs");
const { response } = require("../app");

/* GET users listing. */
router.post("/notify", async function (req, res, next) {
  //console.log(req.body.id);
  console.log("id_order", req.body.id);

  let [rows, fields] = await pool.query(
    `SELECT acc.token FROM accounts acc INNER JOIN history_order hod ON acc.id_account = hod.id_account WHERE hod.id_order = ${req.body.id};`
  );
  console.log("----", rows[0].token);
  if (rows[0].token) {
    let temp = "";
    if (req.body.status1 === "accept") {
      temp = "Your order has been received";
    } else if (req.body.status1 === "processing") {
      temp = "Brewing your drink";
    } else if (req.body.status1 === "done") {
      temp = "Your drink is ready";
    }

    var data = qs.stringify({
      message: temp,
    });

    var config = {
      method: "post",
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${rows[0].token}`,
      },
      data: data,
    };
    let res1 = "";
    axios(config)
      .then(function (response) {
        res1 = response.data;
        res.status(200).send(res1);

        //   console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
        res.status(200).send(500);
      });
  } else {
    res.status(400).send("error cannot find token");
  }
});

//-------------------------------------------------------------------------------------------------------------------
router.post("/getToken", async function (req, res, next) {
  try {
    let result2 = await axios.get(
      `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=<client_id>&redirect_uri=<callback_url>&scope=notify&state=<client_secret>`
    );
    console.log(result2.request);
    // res.status(200).send(result2);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.put("/updateUserToken", async function (req, res, next) {
  console.log("----");

  //   console.log(req.body);
  let { code, state, line_id } = req.body;
  console.log({ code, line_id, state });

  try {
    const formdata = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://1356-2405-9800-b960-ceb0-24a6-d7c3-e3b0-826a.ap.ngrok.io/confirm",
      client_id: "P3KIXdijxSmekYZgBaCu1J",
      client_secret: "3tq6MK7uXSF6vSelT3Ych0TwC8DZd0oPDS0bjhu4TSF",
    };

    var config = {
      method: "post",
      url: "https://notify-bot.line.me/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(formdata),
    };

    axios(config)
      .then(async (data) => {
        if (data.status === 200) {
          console.log("=======", data);

          //   saveToken(data.data.access_token);
          let [rows, fields] = await pool.query(
            `UPDATE accounts SET token = "${data.data.access_token}" WHERE line_id = "${line_id}"`
          );
          if (rows) {
            console.log(rows);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (e) {
    console.log("error", e);
  }
});

module.exports = router;
