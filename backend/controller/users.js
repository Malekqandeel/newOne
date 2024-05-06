const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const bcryptPassword = await bcrypt.hash(password, 7);
    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const data = [username.toLowerCase(), bcryptPassword];
    const result = await pool.query(query, data);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

const login = (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const query = `SELECT * FROM users WHERE username = $1`;
  const data = [username.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              username: result.rows[0].username,
              role: result.rows[0].role_id
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
              message: `The email doesn’t exist or the password you’ve entered is incorrect`
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err
      });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM users WHERE id= $1`;
  pool
    .query(query, id)
    .then((result) => {
      res.status(200).json({
        message: `users id = ${id}`,
        result: result
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const updateUserById = (req, res) => {
  const { id } = req.params;
  const { username, password, type } = req.body;
  const query = `UPDATE users SET username=$1 ,password =$2,type=$3 WHERE id= $4`;
  const data = [username, password, type, id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(202).json({
        message: `Modified user id =${id}  `
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = { register, login, getUserById, updateUserById };
