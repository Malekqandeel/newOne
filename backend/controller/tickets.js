const {connection} = require('../models/db');

const createTicket = (req,res)=>{
    const {title,
        body,
        priority, 
        photo} = req.body;
    const user_id = req.token.userId;
    const data = [title,body,user_id, priority || null,photo || null];
    const query = "INSERT INTO ticket (title, body,user_id,priority ,photo) VALUES (?,?,?,?,?)"

    connection
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was created successfully",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteTicket = (req,res)=>{
  const {id}= req.params;
  const query = "DELETE FROM ticket WHERE id =?"
  const data = [id];
  connection
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was deleted successfully",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};



module.exports ={
    createTicket,

}