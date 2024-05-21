import React from 'react';
import axios from "axios";

const createTicket =()=>{
    axios.post(`http://localhost:5000/tickets/create`)
}

const ticket = () => {
  return (
    <div>
        <h1>
            hi
        </h1>
    </div>
  )
}

export default ticket