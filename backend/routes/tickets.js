const express = require("express");
const {createTicket} = require("../controller/tickets");

const ticketRouter = express.Router();

module.exports = ticketRouter;