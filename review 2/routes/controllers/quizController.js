import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const getRandomQuiz = async({ response }) => {
    const randomQuestion = await questionService.getRandomQuestion();
    if (randomQuestion && randomQuestion.length > 0) {
        response.redirect(`/quiz/${randomQuestion[0].id}`)
    } else {
        response.body = "There are currently no questions!";
    }
};

const showQuizPage = async({ response, render, params }) => {
    const questionInfo = await questionService.getQuestionInfo(params.id);
    if (questionInfo && questionInfo.length > 0) {
        const data = questionInfo[0];
        data.answerOptions = await answerOptionService.getQuestionAnswerOptions(params.id);
        render("quizPage.eta", data);
    } else {
        response.body = `There exists no quiz with ID: ${params.id}`; 
    }
}

const chooseOption = async({ response, render, params, user }) => {
    const isCorrect = await answerOptionService.checkAnswer(params.optionId);
    await questionAnswerService.addAnswer(user.id, params.id, params.optionId, isCorrect);
    const result = isCorrect ? "correct" : "incorrect";
    response.redirect(`/quiz/${params.id}/${result}`);
}

const showResult = async({ response, request, render, params }) => {
    const correctOption = await answerOptionService.getCorrectAnswerText(params.id);
    render("quizResult.eta", { is_correct : !request.url.pathname.endsWith("incorrect"), correct_option: correctOption });
}


  
export { getRandomQuiz, showQuizPage, chooseOption, showResult };