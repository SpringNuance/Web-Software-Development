import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import { optionValidation  } from "../../validation/validate.js";


const addOption = async ({ render, params, request, response, user }) => {
    //Get id of the user that has created question, where the opetion is going to be added
    //first get the question that is going to be get new option
    const question = await questionService.getQuestionById(params.id);
    //user that created the question 
    const questionCreator = question.user_id

    if (questionCreator != user.id) {
        response.body = "You can't create answer options to questions that you haven't created."
    } else {
        const body = request.body({ type: "form" });
        const params1 = await body.value;

        const optionData = { 
            option_text: params1.get("option_text")
        };

        const res = await optionValidation({option_text: optionData.option_text})
        const passes = res[0];
        const errors = res[1];

        if (!passes) {
            optionData.validationErrors = errors;
            optionData.options = await optionService.listOptionsByQuestionId(params.id);
            optionData.question =  question;
            render("question.eta", optionData );
        }
        else {
            const correctness = params1.has("is_correct");
            await optionService.addOption(params.id, params1.get("option_text"), correctness); 
    
            response.redirect(`/questions/${params.id}`);
        }  
    }
};


const showOptions = async ({ params, render }) => {
    

    render("question.eta", { question: await questionService.getQuestionById(params.id), options: await optionService.listOptionsByQuestionId(params.id) });
};


const removeOption = async ({ params , response }) => {

    await optionService.removeOption(params.optionId, params.questionId);

    response.redirect(`/questions/${params.questionId}`);
};


export { addOption, showOptions, removeOption };