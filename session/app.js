import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
new OakSession(app);

const router = new Router();

const helloName = async ({ state, response }) => {
  let name = await state.session.get("name");
  if (!name) {
    name = "anonymous";
  }

  response.body = `Hello ${name}!`;
};

const setName = async ({ request, state, response }) => {
  const body = request.body();
  const params = await body.value;
  await state.session.set("name", params.get("name"));

  response.redirect("/");
};

router.get("/", helloName);
router.post("/", setName);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;