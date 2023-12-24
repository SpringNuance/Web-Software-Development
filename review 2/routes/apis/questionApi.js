import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const getRandomQuestionInfo = async ({ response }) => {
    const randomQuestion = await questionService.getRandomQuestion();
    if (randomQuestion && randomQuestion.length > 0) {
        const question = randomQuestion[0];
        const answerOptions = await answerOptionService.getQuestionAnswerOptions(question.id);
        const questionData = {
            "questionId" : question.id,
            "questionTitle" : question.title,
            "questionText" : question.question_text,
            "answerOptions" : [],
        };
        if (answerOptions && answerOptions.length > 0) {
            answerOptions.forEach(option => {
                questionData.answerOptions.push({ "optionId" : option.id, "optionText" : option.option_text });
            });
        }
        response.body = questionData;
    } else {
        response.body = {};
    }
  };

  const checkAnswer = async({ request, response}) => {
    const body = request.body({ type: "json" });
    const content = await body.value;
    response.body = await answerOptionService.checkApiAnswer(content.questionId, content.optionId);
  };
  
  export { getRandomQuestionInfo, checkAnswer };