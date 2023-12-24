import render from "./middlewares/renderMiddleware.js";
import * as ticketService from "../services/ticketService.js";


const viewAllTickets = async (request) => {
  const data = {
    projects: await ticketService.viewTickets(),
  };
  return data

  request.respond({ body: await  });
};

export { viewAllTickets };