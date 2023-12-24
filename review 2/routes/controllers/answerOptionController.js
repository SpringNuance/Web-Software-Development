import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import { validasaur } from "../../deps.js";

const answerOptionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1) ],
};

const getAnswerOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        option_text: params.get("option_text"),
        is_correct: params.has("is_correct"),
    };
};
  
const addAnswerOption = async ({render, params, request, response, user }) => {
    if (await answerOptionService.checkOwnerOfQuestion(params.id, user.id)) {
        const answerData = await getAnswerOptionData(request);
        const [passes, errors] = await validasaur.validate(answerData, answerOptionValidationRules);
        if (!passes) {
          console.log(errors);
          const questionData = await questionService.getQuestionInfo(params.id)[0];
          answerData.validationErrors = errors;
          answerData.id = params.id;
          answerData.title = questionData[0].title;
          answerData.question_text = questionData[0].question_text;
          answerData.answerOptions = await answerOptionService.getQuestionAnswerOptions(params.id);
          render("questionPage.eta", answerData);
        } else {
          await answerOptionService.addAnswerOption(params.id, answerData.option_text, answerData.is_correct);
          response.redirect(`/questions/${params.id}`);
        }
    } else {
        response.body = "You are not allowed to add answer options to other people's quiz questions.";
    }
    
};
  
const deleteAnswerOption = async( { response, params, user }) => {
    if (await answerOptionService.checkOwnerOfQuestion(params.questionID, user.id)) {
        await answerOptionService.deleteAnswerOption(params.questionID, params.optionID);
        response.redirect(`/questions/${params.questionID}`);
    } else {
        response.body = "You are not allowed to delete other people's quiz options.";
    }
    
};

export { 
    addAnswerOption, 
    deleteAnswerOption
}