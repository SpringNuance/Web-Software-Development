import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";

const getQuiz = async ({ response }) => {

    const rows = await questionService.listAll();
    const rowsLength = rows.length
    const index = `${Math.floor(rowsLength * Math.random())}`;
    const question_id = rows[index].id;
    
    response.redirect(`/quiz/${question_id}`);
    
};


const showQuiz = async ({ params, render }) => {

    render("quiz.eta", { question: await questionService.getQuestionById(params.id), options: await optionService.listOptionsByQuestionId(params.id) });
};


export { getQuiz, showQuiz };