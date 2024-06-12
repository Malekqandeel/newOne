const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { username, email, password, user_type } = req.body;
  let role_id;

  if (user_type === "user") {
    role_id = 2;
  } else if (user_type === "company") {
    role_id = 1;
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user type"
    });
    return;
  }
  const bcryptPassword = await bcrypt.hash(password, 7);
  const query =
    "INSERT INTO users (username,email ,password,user_type) VALUES ($1,$2,$3,$4)";
  const values = [
    username.toLowerCase(),
    email.toLowerCase(),
    bcryptPassword,
    user_type
  ];
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "created email successfully",
        result: result.rows[0]
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The email already exited",
        err: err.message
      });
      console.log(err);
    });
};

const login = (req, res) => {
  const { email, username } = req.body;
  const { password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1 OR username=$2`;
  const data = [email.toLowerCase() || username.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              username: result.rows[0].email,
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
    .query(query, [id])
    .then((result) => {
      res.status(200).json({
        message: `users id = ${id}`,
        result: result.rows
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
      console.log(err);
    });
};
const updateUserById = (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name } = req.body;
  const query = `UPDATE users SET email = COALESCE($1, email), first_name = COALESCE($2, first_name), last_name = COALESCE($3, last_name) WHERE id = $4 RETURNING *`;
  const data = [email, first_name, last_name, id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(202).json({
        message: `Modified user id =${id}  `,
        result: result.rows
      });
    })
    .catch((err) => {
      res.json(err.message);
      console.log(err);
    });
};

module.exports = {
  register,
  login,
  getUserById,
  updateUserById
};
