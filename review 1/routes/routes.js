import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as logoutController from "./controllers/logoutController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/questions", questionController.listQuestions);
router.post("/questions", questionController.createQuestion);
router.get("/questions/:id", questionController.showQuestion);
router.post("/questions/:id/options", questionController.addOption);
router.post("/questions/:id/delete", questionController.deleteQuestion);
router.post("/questions/:questionId/options/:optionId/delete", questionController.deleteOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", logoutController.logout);


router.get("/quiz", questionController.getRandomQuestion);
router.get("/quiz/:id", questionController.showQuiz);
router.post("/quiz/:id/options/:optionId", questionController.addAnswer);
router.get("/quiz/:id/correct", questionController.processAnswer);
router.get("/quiz/:id/incorrect", questionController.processAnswer);

router.get("/statistics", statisticsController.showUserStatistics);

router.get("/api/questions/random", questionApi.randomQuestion);
router.post("/api/questions/answer", questionApi.answerQuestion);

export { router }