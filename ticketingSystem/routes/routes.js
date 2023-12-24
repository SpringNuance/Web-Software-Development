import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as helloController from "./controllers/nameController.js";

const router = new Router();

router.get("/names", helloController.getNames)
  .post("/names", helloController.addName)

export { router };