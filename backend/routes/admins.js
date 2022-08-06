var express = require('express');
var router = express.Router();
const axios = require("axios");
const pool = require("../modules/poolConnection");

/* GET users listing. */
// ---------Category on NavbarAdminHead------------------
router.get("/home/:params", async function (req, res, next) {
  try{
    const [rows,fields] = await pool.query(`
    SELECT p.id_product,p.product_name, p.product_photo,c.category_name, p.hot_price,p.iced_price,p.frappe_price 
    FROM products AS p 
    LEFT JOIN category AS c ON c.id_category = p.id_category
    where c.category_name = '${req.params.params}'
    ORDER BY p.id_product ASC
    `);
    return res.status(200).send(rows);
  }
  catch(err){
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
});


// ---------EditProduct Mark-product------------------
router.get('/editproduct/:params', async function(req, res, next) {
  try {
    let [rows, fields] = await pool.query(
      `SELECT * FROM products WHERE id_product = ${req.params.params}`
    );
    res.status(200).send(rows);
  } catch (e) {
    // console.log(req.params.params);
  }
});


// ---------------------Edit Product------------------------------
router.put('/product/edit/:params', async function(req, res, next) {
  try{
    const newpath = __dirname + "/../public/pic/";
    const file = req.files.product_photo;
    const dotIndex = file.name.lastIndexOf('.');
    const fileExtension = file.name.substr(dotIndex);
    const randomFilename = (new Date()).getTime();
    const filename = randomFilename + fileExtension;
    console.log(req.files);
    console.log(`${newpath}${filename}`);
   
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return(res.status(500).send({ message: "File upload failed" }));
      }
        return(res.status(200).send({ message: 'success', filename: filename }));
    });

    const [rows,fields] = await pool.query(
    `update products set 
    product_name = "${req.body.product_name}",
    product_photo = "${filename}",
    id_category = "${req.body.id_category}",
    hot_price = "${req.body.hot_price}",
    iced_price = "${req.body.iced_price}",
    frappe_price = "${req.body.frappe_price}"
    where id_product = ${req.params.params}`)

    if(rows.affectedRows > 0){
      console.log(rows);
      return res.status(200);
    }
      return res.status(400);
  }
  catch (err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }
});



//add product
router.post("/product/add", async function (req, res, next) {
  try {
    const newpath = __dirname + "/../public/pic/";
    const file = req.files.product_photo;
    const dotIndex = file.name.lastIndexOf('.');
    const fileExtension = file.name.substr(dotIndex);
    const randomFilename = (new Date()).getTime();
    const filename = randomFilename + fileExtension;
    console.log(req.files);
    console.log(`${newpath}${filename}`);
   
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return(res.status(500).send({ message: "File upload failed" }));
      }
        return(res.status(200).send({ message: 'success', filename: filename }));
    });


    const [rows, fields] = await pool.query(
      `insert into products(
        product_name, 
        product_photo, 
        id_category, 
        hot_price, 
        iced_price, 
        frappe_price) 
        values (?, ?, ?, ?, ?, ?)`,
        [req.body.product_name,filename,parseInt(req.body.id_category),parseInt(req.body.hot_price),parseInt(req.body.iced_price),parseInt(req.body.frappe_price)]);
        if (rows.affectedRows > 0) {
          console.log(rows);
          return res.status(200);
        }
        return res.status(400);
  } 
  catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
});


//add category
router.post('/category/add',async function(req, res, next){
  try{
    const [rows,fields] = await pool.query(
    `insert into category(category_name)
    value (?)`,[req.body.category_name]);
    
    if(rows.affectedRows > 0){
      console.log(rows);
      return res.status(200);
    }
      return res.status(400);
  }
  catch (err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }
});



router.delete('/product/del/:params', async function(req, res, next) {
  try{
    const [rows,fields] = await pool.query(
    `DELETE FROM products WHERE products.id_product = "${req.params.params}"`)
    if(rows.affectedRows > 0){
      console.log(rows);
      return res.status(200);
    }
      return res.status(400);
  }
  catch (err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }
});



router.get("/category/edit/:getId", async function (req, res, next) {
  try {
    let [rows, fields] = await pool.query(
      `SELECT id_category, category_name FROM category WHERE category.id_category = "${req.params.getId}"`
    );
    res.status(200).send(rows);
  } catch (e) {
    console.log(req.params.getId);
  }
});

router.delete('/category/del/:params', async function(req, res, next) {
  try{
    const [rows,fields] = await pool.query(
    `DELETE FROM category WHERE category.id_category = "${req.params.params}"`)
    if(rows.affectedRows > 0){
      console.log(rows);
      return res.status(200);
    }
      return res.status(400);
  }
  catch (err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }
});


// ----------------------Not finish------------------------------
router.put('/category/edit/:params',async function(req, res, next){
  try{
    const [rows,fields] = await pool.query(
    `update category set 
    category_name = "${req.body.category_name}" 
    where id_category = ${req.params.params}`)

    if(rows.affectedRows > 0){
      console.log(rows);
      return res.status(200);
    }
      return res.status(400);
  }
  catch (err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }
});

//edit category bam

router.put('/category/toggle_category/:params',async function(req, res, next){
  try{
    const [rows,fields] = await pool.query(
    `UPDATE category SET isShow = ? where id_category = ?`,
    [req.body.isShow,req.params.params])
      console.log(rows);
    if(rows.affectedRows > 0){
      console.log(rows);
      return res.status(200).json({message: "success"})

    }
      return res.status(400).json({message: "fail"});
  }
  catch (err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }
});



module.exports = router;
