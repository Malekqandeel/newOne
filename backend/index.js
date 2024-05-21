const express = require("express");
require("dotenv").config();
const app = express();
require("./models/db");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 5000;
const usersRouter = require("./routes/users");
const ticketRouter = require("./routes/tickets");
const workspaceRouter = require("./routes/workspace");

app.use("/tickets", ticketRouter);
app.use("/users", usersRouter);
app.use("/workspace", workspaceRouter);

app.listen(PORT, () => {
  console.log(`connecting server on ${PORT}`);
});
