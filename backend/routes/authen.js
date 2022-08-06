var express = require("express");
const pool = require("../modules/poolConnection");
var router = express.Router();

/* GET home page. */
router.post("/login", async function (req, res, next) {
  // console.log(req.body);
  const { line_id, line_name, line_pic } = req.body;
  //ดึงข้อมูลใน DB ว่ามีไหม
  const [rows, fields] = await pool.query(
    `SELECT * FROM accounts WHERE line_id = "${line_id}"`
  );
  // console.log("rows", rows);

  //1. ไม่มีข้อมูลในระบบให้ register เป็น user
  if (rows.length === 0) {
    const [rows1, fileds1] = await pool.query(
      "INSERT INTO `accounts`(`line_id`, `line_name`, `line_pic`, `role`) VALUES (?,?,?,?)",
      [line_id, line_name, line_pic, "user"]
    );

    //1.1 เพิ่ม usr สำเร็จ
    if (rows1.affectedRows === 1) {
      const [rows2, fields2] = await pool.query(
        `SELECT * FROM accounts WHERE id_account = ${rows1.insertId} `
      );
      // console.log(rows2);
      res.status(200).send(rows2[0]);
      // console.log("register user", rows1.insertId);
    }
    //1.2 เพิ่ม usr ไม่สำเร็จ
    else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
  //2. มีข้อมูลในระบบว่าเป็น admin/user/bartender
  else {
    // console.log(rows);
    res.status(200).send(rows[0]);
  }
});

module.exports = router;
