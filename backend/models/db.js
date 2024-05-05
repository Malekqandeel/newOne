const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "todolist",
  port: 3306
});
pool.query(console.log("ra shed"));
module.exports = { pool };
