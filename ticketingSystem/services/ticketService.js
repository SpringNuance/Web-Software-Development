import { executeQuery } from "../database/database.js";

const viewTickets = async () => {
  let result = await executeQuery("SELECT * FROM tickets;");
  if (result) {
    return result.rows;
  }

  return [];
};

const addTicket = async (content) => {
  await executeQuery(
    "INSERT INTO tickets (content, reported_on) VALUES ($1, NOW());",
    content
  );
};

const resolveTicket = async (id) => {
  await executeQuery(
    "UPDATE tickets SET resolved_on = NOW() WHERE id = $1;",
    id
  );
};

const deleteTicket = async (id) => {
  await executeQuery("DELETE FROM tickets WHERE id = $1;", id);
};

export { viewTickets, addTicket, resolveTicket, deleteTicket };
