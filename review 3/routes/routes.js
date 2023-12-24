import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as answerController from "./controllers/answerController.js";

import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/questions", questionController.listQuestions)
router.post("/questions", questionController.addQuestion);

router.get("/questions/:id", optionController.showOptions);
router.post("/questions/:id/options", optionController.addOption);

router.post("/questions/:id/delete",  questionController.removeQuestion);
router.post("/questions/:questionId/options/:optionId/delete", optionController.removeOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.post("/quiz/:id/options/:optionId", answerController.addAnswer);
router.get("/quiz/:id/correct", answerController.showCorrect);
router.get("/quiz/:id/incorrect", answerController.showIncorrect);

router.get("/quiz/:id", quizController.showQuiz);
router.get("/quiz", quizController.getQuiz);

router.get("/statistics", answerController.showStatics);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.postAnswer);


export { router };
