const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

if(!process.env.DBHOST){
  dotenv.config();
}

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: 3306,
});

module.exports = pool;
