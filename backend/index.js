const express = require("express");
require("dotenv").config();
const app = express();
require("./models/db");
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
