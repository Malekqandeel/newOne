const {pool} = require('../models/db');

const createTicket = (req,res)=>{
    const {title,
        body,
        priority, 
        photo} = req.body;
    const user_id = req.token.userId;
    const data = [title,body,user_id, priority || null,photo || null];
    const query = "INSERT INTO ticket (title, body,user_id,priority ,photo) VALUES (?,?,?,?,?)";


    pool
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
  pool
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

const updateTicket = (req,res)=>{
    const {title,
    body,
    priority, 
    photo} = req.body;
    const user_id = req.token.userId;
    const ticket_id = req.params.id;

    const query = "UPDATE ticket SET title=COALESCE(?,title), body=COALESCE(?,body), priority=COALESCE(?,priority), photo=COALESCE(?,photo) WHERE ticket_id =?";
    const data=[title,body,priority,photo,user_id,ticket_id];

    pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was updated successfully",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
  };

  const selectTicketForUserId = (req,res)=>{
    const user_id = req.token.userId;
    const query = "SELECT * FROM ticket WHERE user_id =?"

    const data = [user_id];

    pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket's user",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
  };


const favoriteTicket = (req,res)=>{
  const {id}=req.params;

  const query ="INSERT INTO favorite (ticket_id) VALUES ?"
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was updated as favorite",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};

const removeFavoriteTicket = (req,res)=>{
  const {id}=req.params;

  const query ="DELETE FROM favorite WHERE id =?"
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        message: "Ticket was removed as favorite",
        result: result
      });
    })
    .catch((err) => {
      throw err;
    });
};


module.exports ={
    createTicket,
    removeFavoriteTicket,
    updateTicket,
    deleteTicket,
    selectTicketForUserId,
    favoriteTicket
}