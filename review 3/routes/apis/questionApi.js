import * as questionService from "../../services/questionService.js"
import * as optionService from "../../services/optionService.js"
import * as answerService from "../../services/answerService.js"

const getRandomQuestion = async ({ response }) => {

    const data = {
        questionId: "",
        questionTitle: "",
        questionText: "",
        answerOptions: [],
    };

    // get id of random question
    const rows = await questionService.listAll();
    const rowsLength = rows.length
    if (rowsLength === 0) {
        response.body = {};
    }
    const index = `${Math.floor(rowsLength * Math.random())}`;
    const question_id = rows[index].id;
    // get question and add them as a part of api
    const question = await questionService.getQuestionById(question_id);
    data.questionId = question.id;
    data.questionTitle = question.title;
    data.questionText = question.question_text;
    // get answer options
    const options = await optionService.listOptionsByQuestionId(question_id);
    options.forEach( option => {
        data.answerOptions.push({optionId: option.id, optionText: option.option_text});
    });

    response.body = data;
    
};



//const hello = ({ response }) => {
 //   response.body = "Hello world!";
 // };




const postAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const content = await body.value;
    const questionId = content.questionId;
    const optionId = content.optionId;

    const correctOption = await answerService.getCorrectAnswer(questionId)
    const correctOptionId = correctOption[0].id;

    const correct = (correctOptionId === optionId);

    response.body = {correct: correct};
};



export { getRandomQuestion, postAnswer };