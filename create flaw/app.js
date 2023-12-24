import {
  Application,
  HttpServerStd,
  Router,
  send,
} from "https://deno.land/x/oak@v7.7.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { executeQuery } from "./database/database.js";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

app.use(renderMiddleware);

const serveStaticFilesMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const path = context.request.url.pathname.substring(7);
    await send(context, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

app.use(serveStaticFilesMiddleware);

const listNames = async ({ response }) => {
  response.body = (await executeQuery("SELECT * FROM names")).rows;
};

const addName = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const name = document.name;
  await executeQuery(`INSERT INTO names (name) VALUES ('${name}');`);
  response.status = 200;
};

router.get("/", ({ render }) => render("index.eta"));
router.get("/api/names", listNames);
router.post("/api/names", addName);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
