const { connection } = require("../models/db");

const register = (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  const data = [username, password];
  connection
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "register",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = { register };
