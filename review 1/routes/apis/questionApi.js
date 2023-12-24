import * as questionService from "../../services/questionService.js";


const randomQuestion = async ({ response }) => {
    const res = await questionService.listQuestions();
    let randomQuestion = {};
    if (res && res.length > 0) {
        const rQes = res[Math.floor(Math.random()*res.length)];
        randomQuestion.questionId = rQes.id;
        randomQuestion.questionTitle = rQes.title;
        randomQuestion.questionText = rQes.question_text;

        const options = await questionService.listOptions(rQes.id);
        const answerOptions = [];
        for (let i=0; i<options.length; i++) {
            answerOptions.push({
                optionId: options[i].id,
                optionText: options[i].option_text,
            });
        }

        randomQuestion.answerOptions = answerOptions;
    }

    response.body = randomQuestion;
};


const answerQuestion = async ({ request, response }) => {
    const body = request.body({type: "json"});
    const document = await body.value;

    let correct = false;
    if (document.optionId && document.questionId) {
        const res = await questionService.showOption(document.optionId, document.questionId);
        if (res && res.length>0) {
            correct = res[0].is_correct;
        }
    }

    response.body = {correct: correct};
}

export { randomQuestion, answerQuestion };