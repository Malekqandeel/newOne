const express = require("express");
const {
  register,
  login,
  updateUserById,
  getUserById,
  registerCompany,
  loginCompany
} = require("../controller/users");

const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/update/:id", updateUserById);
usersRouter.get("/:id", getUserById);
usersRouter.post("/registerCompany", registerCompany);
usersRouter.post(`/loginCompany`, loginCompany);

module.exports = usersRouter;
