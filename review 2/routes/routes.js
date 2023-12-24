import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as api from "./apis/questionApi.js";

const router = new Router();

//Show the main page with description and all that
router.get("/", mainController.showMain);

//List, add or delete questions
router.get("/questions", questionController.listQuestions);
router.post("/questions", questionController.addQuestion);
router.post("/questions/:id/delete", questionController.deleteQuestion);

//Show the question page
router.get("/questions/:id", questionController.showQuestion);

//Post a new answer option to question with :id
router.post("/questions/:id/options", answerOptionController.addAnswerOption);
//Delete answer options
router.post("/questions/:questionID/options/:optionID/delete", answerOptionController.deleteAnswerOption);


//Show registration form and handle registrations
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

//Login functionality
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", loginController.logout);

//Quiz functionality
router.get("/quiz", quizController.getRandomQuiz);
router.get("/quiz/:id", quizController.showQuizPage);
router.post("/quiz/:id/options/:optionId", quizController.chooseOption);

//Quiz results, both use the same function and eta file
router.get("/quiz/:id/correct", quizController.showResult);
router.get("/quiz/:id/incorrect", quizController.showResult);

//Statistics
router.get("/statistics", statisticsController.showStatistics);

//Api
router.get("/api/questions/random", api.getRandomQuestionInfo);
router.post("/api/questions/answer", api.checkAnswer);

export { router };