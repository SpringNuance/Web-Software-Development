// import { Application, HttpServerStd } from "https://deno.land/x/oak@v7.7.0/mod.ts";
// import { OakSession } from "https://deno.land/x/sessions@v1.5.4/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";
import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.5.1/mod.ts";

// const app = new Application({
//   serverConstructor: HttpServerStd,
// });
// app.use(errorMiddleware);

// new OakSession(app);

// app.use(renderMiddleware);

// app.use(router.routes());

// if (!Deno.env.get("TEST_ENVIRONMENT")) {
//   app.listen({ port: 7777 });
// }

// export default app;

const app = new Application();
app.use(errorMiddleware);

const session = new Session();
app.use(session.initMiddleware());

app.use(renderMiddleware);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
