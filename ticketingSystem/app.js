import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import * as ticketService from "./services/ticketService.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});

const router = new Router();

app.use(renderMiddleware);

const listTickets = async ({ render }) => {
  const data = {
    tickets: await ticketService.viewTickets()
  }
  render("index.eta", data);
};

const addTicket = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;
  await ticketService.addTicket(params.get("content"));
  response.redirect("/tickets");
};

const resolveTicket = async ({ params, response }) => {
  await ticketService.resolveTicket(params.id);
  response.redirect("/tickets");
};

const deleteTicket = async ({ params, response }) => {
  await ticketService.deleteTicket(params.id);
  response.redirect("/tickets");
};

router.get("/tickets", listTickets);
router.post("/tickets", addTicket);
router.post("/tickets/:id/resolve", resolveTicket);
router.post("/tickets/:id/delete", deleteTicket);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;