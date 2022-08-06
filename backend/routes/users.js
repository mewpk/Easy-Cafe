var express = require("express");
var router = express.Router();
const axios = require("axios");
const pool = require("../modules/poolConnection");

//แสดงเมนูแต่ละ category
router.get("/home/:params", async function (req, res, next) {
  try {
    // console.log("------");
    let [rows, fields] = await pool.query(
      `SELECT * FROM products WHERE products.id_category = (SELECT category.id_category FROM category WHERE category.category_name = '${req.params.params}')`
    );
    res.status(200).send(rows);
  } catch (e) {
    console.log("error", e);
  }
});

//reset ของใน cart หลัง login เข้ามา
router.delete("/startDeleteCart", async function (req, res, next) {
  try {
    // console.log("delll", req.body.line_id);
    let [rows, fileds] = await pool.query(
      `DELETE FROM cart WHERE cart.id_account = (SELECT id_account FROM accounts WHERE line_id = "${req.body.line_id}")`
    );
    res.status(200).send("reset user's Cart ");
  } catch (e) {
    console.log(e);
  }
});

//แสดง category ที่หัว navbar ทั้งหมด
router.get("/allCategory", async function (req, res, next) {
  // console.log("test");
  try {
    let [rows, fields] = await pool.query(`SELECT * FROM category`);
    // console.log(rows);
    res.status(200).send(rows);
  } catch (e) {
    console.log(e);
  }
});

// //เก็บ order ที่ลูกต้า ADD
router.post("/cart", async function (req, res, next) {
  // console.log(req.body.total);
  const { id_account, drinkType, productName, quantity, status_pay, total } =
    req.body;
  const [rows, fileds] = await pool.query(
    `SELECT id_product FROM products WHERE products.product_name = "${productName}"`
  );
  // console.log("rrr", rows[0].id_product);

  //เก็บค่าที่ ADD order ลงใน cart
  if (rows[0]) {
    // console.log("id_account", id_account);
    const [rows1, fields1] = await pool.query(
      `INSERT INTO cart (id_account, id_product, amount_cup, type, status_pay, total) VALUES (?,?,?,?,?,?) `,
      [id_account, rows[0].id_product, quantity, drinkType, status_pay, total]
    );

    // console.log("rows", rows);
    // console.log("rows1", rows1);

    if (rows1) {
      let data = { insertId: rows1.insertId, id_product: rows[0].id_product };
      // console.log("data", data);
      res.status(200).send(data);
    }
  }
});

//กด Cart แล้วแสดงของที่อยู่ใน cart ทั้งหมด
router.post("/showCart", async function (req, res, next) {
  // console.log(req.body);
  const { id_account } = req.body;
  // console.log("id_accountid_account", id_account);

  const [rows, fields] = await pool.query(
    `SELECT * FROM cart WHERE cart.id_account = ${id_account}`
  );
  res.status(200).json(rows);
  // console.log("showCart", rows);
});

//ลบ order ใน cart
router.delete("/deleteOrder", async function (req, res, next) {
  // console.log(req.headers.productname);
  const [rows, fileds] = await pool.query(
    `DELETE FROM cart WHERE id_cart = ${req.headers.productname} `
  );
  if (rows) {
    res.status(200).send("deleted order in cart ");
  }
});

//หา menu ที่ถูก edit เพื่อเอาไปแสดงหน้า edit
router.post("/currentEditOrder", async function (req, res, next) {
  // console.log("head", req.body.currentMenu);
  const [rows, fileds] = await pool.query(
    `SELECT * FROM products WHERE products.product_name = "${req.body.currentMenu.productName}"`
  );
  const [rows1, fileds1] = await pool.query(
    `SELECT * FROM cart WHERE cart.id_cart = ${req.body.currentMenu.id_cart}`
  );
  // console.log("rows", rows);
  // console.log("rows1", rows1);
  let data = [rows[0], rows1[0]];

  if (data) {
    // console.log("data", data);
    res.status(200).json(data);
  } else {
    res.status(400).send("cannot find menu to show on edit display");
  }
});

//แก้ order ในตาราง cart
router.put("/editOrderAgain", async function (req, res, next) {
  // console.log("state", req.body.state);

  // console.log("product", req.body.state.product);
  // if ()
  const [rows, fileds] = await pool.query(
    `UPDATE cart SET amount_cup = ${req.body.state.product[1].amount_cup}, type = "${req.body.state.editedType}" WHERE id_cart = ${req.body.state.id_cart}`
  );
  if (rows) {
    // console.log(rows);
    res.status(200).send(rows);
  } else {
    res.status(400).send("cannot edit order");
  }
});

// router.put("/editUserCart", async function (req, res, next) {
//   const [rows, fileds] = await pool.query(`UPDATE`);
// });

router.put("/edit/:id", async function (req, res, next) {
  // console.log("test", req.params.id);
  const [rows, fields] = await pool.query(
    `update products set 
    product_name = "${req.body.product_name}" , 
    product_photo = "${req.body.product_photo}",
    id_category = ${req.body.id_category},
    hot_price = ${req.body.hot_price},
    iced_price = ${req.body.iced_price},
    frappe_price = ${req.body.frappe_price}
    where id_product = ${req.params.id}`
    // [req.params.id]
  );

  rows.affectedRows > 0
    ? res.status(200).json(rows.affectedRows)
    : res.status(400).send("No data");
});

// router.get("/notification", function (req, res, next) {
//   res.send("respond notification");
// });

module.exports = router;
