const mysql = require("mysql");

const user = process.env.username || "root";
const password = process.env.password || "root";


const pool = mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database:"tolist",
    port:3306
  });
  
pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports =mysql