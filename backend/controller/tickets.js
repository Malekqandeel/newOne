const {pool} = require('../models/db');

const createTicket = (req,res)=>{
    const {photo,
        cover,
        priority} = req.body;
        console.log(req.token);
    const user_id = req.token.userId;
    const data = [photo, cover || null, user_id,priority|| null];
    const query = "INSERT INTO tickets (photo, cover,user_id,priority) VALUES ($1,$2,$3,$4) returning *;";

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
  const query = "UPDATE tickets SET is_deleted=1 WHERE id=$1;"
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
    const {ticket_id} = req.params;
    const {cover,
    priority, 
    photo,
    end_at} = req.body;
    const user_id = req.token.userId;
  
    const query = "UPDATE tickets SET photo = COALESCE($1,photo), cover = COALESCE($2, cover),priority = COALESCE($3, priority) ,end_at = COALESCE($4,end_at) WHERE id=$5 AND is_deleted = 0  RETURNING *";
    const data=[photo,cover,priority,end_at,ticket_id];

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
    const query = "SELECT * FROM tickets WHERE user_id =$1"

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

  const selectTicketByUserId = (req,res)=>{
    const {id}=req.params;
    const query = "SELECT * FROM tickets WHERE user_id =$1"

    const data = [id];

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

  const query ="INSERT INTO favorites (ticket_id) VALUES ($1)"
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

  const query ="DELETE FROM favorites WHERE id =$1"
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
    selectTicketByUserId,
    favoriteTicket,
    selectTicketByUserId
}