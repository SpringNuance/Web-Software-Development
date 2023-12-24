import * as questionService from "../../services/questionService.js";
import { questionValidation  } from "../../validation/validate.js";

const addQuestion = async ({ render, request, response, user }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const questionData = {
        title: params.get("title"), 
        question_text: params.get("question_text")
    };

    const res = await questionValidation({title: questionData.title, question_text: questionData.question_text})
    const passes = res[0];
    const errors = res[1];

    if (!passes) {
        questionData.validationErrors = errors;
        questionData.questions = await questionService.listQuestions(user.id);
        render("questions.eta", questionData );
    }
    else {
        await questionService.addQuestion(user.id, params.get("title"), params.get("question_text"));
        response.redirect("/questions");

    }  
    
};

const listQuestions = async ({ render, user }) => {
    render("questions.eta", { questions: await questionService.listQuestions(user.id) });  
};

const removeQuestion = async ({ params, response }) => {
    await questionService.removeQuestion(params.id);
    response.redirect("/questions");
}

export { addQuestion, listQuestions, removeQuestion };

