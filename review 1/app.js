import { Application, HttpServerStd, OakSession } from "./deps.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application({
    serverConstructor: HttpServerStd,
});
new OakSession(app);

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);
app.use(renderMiddleware);
app.use(router.routes());

export { app };