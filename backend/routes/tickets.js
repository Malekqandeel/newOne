const express = require("express");
const {createTicket} = require("../controller/tickets");

const ticketRouter = express.Router();

ticketRouter.post("/create",createTicket);

module.exports = ticketRouter;