import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

///// okie
const getGames = async ({ response }) => {
  const result = await executeQuery("SELECT id, name FROM games;");
  response.body = result.rows;
};

/// okie
const postOneGame = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await executeQuery("INSERT INTO games (name) VALUES ($1);", 
     document.name, 
  );
  response.body = { status: "success" };
};

//// okie
const getOneGame = async ({ params, response }) => {
  const result = await executeQuery(
    "SELECT id, name FROM games WHERE id = $1;",
    params.id,
    );
  response.body = result.rows[0];
};

//// okie
const deleteGame = async ({ params, response }) => {
  await executeQuery("DELETE FROM games WHERE id = $1;", 
     params.id,
  );

  await executeQuery("DELETE FROM ratings WHERE game_id = $1;",
     params.id  
  );

  response.body = { status: "success" };
};

const postRatings = async ({ params, request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  
  await executeQuery("INSERT INTO ratings (rating, game_id) VALUES ($1, $2);", 
     document.rating, 
     params.id,
  );

  response.body = { status: "success" };
};

const getRatings = async ({ params, response }) => {
  const result = await executeQuery(
    "SELECT id, rating, game_id FROM ratings WHERE game_id = $1;",
    params.id,
    );
  response.body = result.rows;
};

router.get("/games", getGames);
router.post("/games", postOneGame);
router.get("/games/:id", getOneGame);
router.delete("/games/:id", deleteGame);
router.post("/games/:id/ratings", postRatings);
router.get("/games/:id/ratings", getRatings);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
