import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as formController from "./controllers/formController.js";

const router = new Router();

router.get("/", formController.viewForm);
router.post("/", formController.processUpload);
router.post("/files", formController.getFile);

export { router };
