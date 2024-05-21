import { createSlice } from "@reduxjs/toolkit";

export const ticket = createSlice({
  name: "ticket",
  initialState: {
    ticket:[],
  },
  reducers: {
    setTickets: (state, action) => {
        state.tickets = action.payload;
      },
      createNewTicket: (state, action) => {
        state.tickets = [action.payload, ...state.ticket];
      },
      updateTicketById: (state, action) => {
        state.tickets = state.ticket.map((elem, ind) => {
          if (elem.id === action.payload.id) {
            console.log(action.payload);
            return { ...elem, ...action.payload };
          }
          return elem;
        });
      },
      deleteTicket: (state, action) => {
        state.tickets = state.ticket.filter(
          (id, index) => id.id !== action.payload
        )
      },
  }
});
export const {
    setTickets,
    createNewTicket,
    updateTicketById,
    deleteTicket
} = ticket.actions;
export default ticket.reducer;