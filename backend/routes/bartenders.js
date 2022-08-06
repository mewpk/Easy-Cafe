var express = require("express");
var router = express.Router();
const pool = require("../modules/poolConnection");

/* GET users listing. */
router.get("/home", async function (req, res, next) {
  try {
    let [rows, fields] = await pool.query(
      `SELECT h.id_order,p.product_name,h.amount,h.type, h.process FROM history_order as h LEFT JOIN products as p ON h.id_product = p.id_product where h.process != 'D' `
    );
    // console.log("hello");
    return res.status(200).send(rows);
  } catch (e) {
    console.log(e);
    return;
  }
});

//R ( R-A-P-D)
//-----------------------*** R *** 0. insert to orders and history tables----------------------------
router.post("/setOrderAndHistoryTable", async function (req, res, next) {
  console.log("___", req.body);
  try {
    let [rows, fields] = await pool.query(
      `INSERT INTO orders (id_account, at_date, total_price) VALUES (${parseInt(
        req.body.id_account
      )}, "${new Date().toLocaleDateString()}", ${req.body.total})`
    );
    console.log("--", rows);

    for (let i = 0; i < req.body.initData.length; i++) {
      let [rows2, fields2] = await pool.query(
        `INSERT INTO history_order (id_order, id_account, id_product,amount, type, process, at_date, total_price) VALUES (${
          rows.insertId
        } ,${parseInt(req.body.id_account)}, ${
          req.body.initData[i].id_product
        }, ${req.body.initData[i].quantity},
        "${req.body.initData[i].drinkType}", 
        "R",
        "${new Date().toLocaleDateString()}", 
        ${req.body.initData[i].total})`
      );
    }

    // );
    // // console.log("hello");
    return res.status(200);
  } catch (e) {
    console.log(e);
    return;
  }
});

//-----------------------*** A *** 1. Accept ----------------------------
router.put("/home/process/accept/:id", async function (req, res, next) {
  try {
    console.log("params", req.params.id);
    // console.log("params", req.params.id);

    let [rows, fields] = await pool.query(`UPDATE history_order
    SET process = "A"
    WHERE id_order = ${req.params.id}`);
    // console.log("hello");
    res.status(200).send(rows);
  } catch (e) {
    console.log(e);
  }
});

//-----------------------*** P *** 2. processing ----------------------------
router.put("/home/process/processing/:id", async function (req, res, next) {
  try {
    let [rows, fields] = await pool.query(`UPDATE history_order
    SET process = "P"
    WHERE id_order = ${req.params.id}`);
    // console.log("hello");
    return res.status(200).send(rows);
  } catch (e) {
    console.log(e);
    return;
  }
});

//-----------------------*** D *** 3. Done ----------------------------
router.put("/home/process/done/:id", async function (req, res, next) {
  try {
    let [rows, fields] = await pool.query(`UPDATE history_order
    SET process = "D"
    WHERE id_order = ${req.params.id}`);
    // console.log("hello");
    return res.status(200).send(rows);
  } catch (e) {
    console.log(e);
    return;
  }
});

router.get('/success', async function(req, res, next) {
  try {
    let [rows, fields] = await pool.query(`SELECT h.id_order,p.product_name,h.amount,h.type,h.at_date FROM history_order as h LEFT JOIN products as p ON h.id_product =p.id_product WHERE h.process = 'D'`);
    console.log("hello");
    return res.status(200).send(rows);
  } catch (e) {
    console.log(e);
    return;
  }
});

module.exports = router;
