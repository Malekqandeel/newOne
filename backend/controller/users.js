const { connection } = require("../models/db");

const register = async (req, res) => {
  const { username, password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 7);

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  const data = [username.toLowerCase(), bcryptPassword];
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
