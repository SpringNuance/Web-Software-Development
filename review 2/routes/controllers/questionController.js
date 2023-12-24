import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1) ],
    question_text: [validasaur.required, validasaur.minLength(1) ],
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        title: params.get("title"),
        question_text: params.get("question_text"),
    };
};

const addQuestion = async ({ request, response, render, user }) => {
  const questionData = await getQuestionData(request);
  const [passes, errors] = await validasaur.validate(questionData, questionValidationRules);
  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    questionData.questions = await questionService.getQuestionsByUser(user.id);
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(user.id, questionData.title, questionData.question_text);
    response.redirect("/questions");
  }
};

const listQuestions = async ({ render, user }) => {
  render("questions.eta", { questions: await questionService.getQuestionsByUser(user.id) });
};

const showQuestion = async ({ render, response, params }) => {
  const questionData = await questionService.getQuestionInfo(params.id);
  if (questionData && questionData.length > 0) {
    const data = questionData[0]; 
    data.answerOptions = await answerOptionService.getQuestionAnswerOptions(params.id);
    render("questionPage.eta", data);
  } else {
    response.body = "Invalid question ID";
  }
  
};

const deleteQuestion = async( { response, params, user }) => {
  await questionService.deleteQuestion(params.id, user.id);
  response.redirect("/questions");
};


export { 
  addQuestion, 
  listQuestions, 
  showQuestion, 
  deleteQuestion,
 };