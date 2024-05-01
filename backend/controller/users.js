const { connection } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { username, password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 7);

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  const data = [username.toLowerCase(), bcryptPassword];
  connection
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "register"
      });
    })
    .catch((err) => {
      throw err;
    });
};
const login = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const query = `SELECT * FROM users WHERE username = ?`;
  const data = [username.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              test: "test information"
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The username doesn’t exist or the password you’ve entered is incorrect`
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The username doesn’t exist or the password you’ve entered is incorrect",
        err
      });
    });
};
module.exports = { register, login };
