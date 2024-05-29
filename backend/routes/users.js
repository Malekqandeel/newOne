const express = require("express");
const {
  register,
  login,
  updateUserById,
  getUserById,
  registerCompany
} = require("../controller/users");

const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/update/:id", updateUserById);
usersRouter.get("/:id", getUserById);
usersRouter.post("/registerCompany", registerCompany);

module.exports = usersRouter;
