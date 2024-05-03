const {connection} =require('../models/db')

const addTicket = (req,res)=>{
    const {ticket_id} = req.params;
    const {title,member,photo} = req.body;

    const query ="INSERT INTO workspace (title,ticket_id,members,photo) VALUES (?,?,?,?)";
    const data =[title,ticket_id,member,photo];

    connection
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was added",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};

const removeTicket = (req,res)=>{
    const {ticket_id}= req.params;

    const query = "DELETE FROM workspace WHERE ticket_id";
    const data = [ticket_id];

    connection
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was removed",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports ={
    addTicket,
    removeTicket
}