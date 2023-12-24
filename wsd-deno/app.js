import { Application, HttpServerStd, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application({
  serverConstructor: HttpServerStd,
});
const router = new Router();

const hello = ({ response }) => {
  response.body = "Hello world!";
};

router.get("/", hello);
app.use(router.routes());

if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  app.listen({ port: Number(lastArgument) });
}

export { app };