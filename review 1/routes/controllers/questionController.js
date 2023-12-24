import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
    const body = request.body({type:"form"});
    const params = await body.value;

    const obj = {
        title: params.get("title"),
        question_text: params.get("question_text"),
    };
    
    return obj;
}

const getOptionData = async (request) => {
    const body = request.body({type:"form"});
    const params = await body.value;

    let isCorrect = false;
    if (params.has("is_correct")) {
        isCorrect = true;
    }

    const obj = {
        option_text: params.get("option_text"),
        isCorrect: isCorrect,
    };
    
    return obj;
}

const listQuestions = async ({render, user}) => {
    render("questions.eta", {
        questions: await questionService.listUserQuestions(user.id),
    });
};

const createQuestion = async ({ request, response, user, render }) => {
    const questionData = await getQuestionData(request);
    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
    );
    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        questionData.questions = await questionService.listUserQuestions(user.id);
        render("questions.eta", questionData);
    } else {
        await questionService.addQuestion(
            user.id,
            questionData.title,
            questionData.question_text,
        );

        response.redirect("/questions");
    }
};

const showQuestion = async ({ render, params, user }) => {
    render("question.eta",{
        question: (await questionService.showQuestionById(params.id, user.id))[0],
        options: await questionService.listOptions(params.id),
    });
};

const addOption = async ({ request, response, params, render, user }) => {
    const optionData = await getOptionData(request);
    const [passes, errors] = await validasaur.validate(
        optionData,
        optionValidationRules,
    );
    if (!passes) {
        console.log(errors);
        optionData.validationErrors = errors;
        optionData.question = (await questionService.showQuestionById(params.id, user.id))[0];
        optionData.options =  await questionService.listOptions(params.id);
        render("question.eta", optionData);
    } else {
        await questionService.addOption(
            params.id,
            optionData.option_text,
            optionData.isCorrect,
        );
        response.redirect(`/questions/${params.id}`);
    }
    
};

const deleteOption = async ({ params, response }) => {
    await questionService.deleteOption(params.questionId, params.optionId);
    response.redirect(`/questions/${params.questionId}`);
};

const deleteQuestion = async ({ params, response, user }) => {
    await questionService.deleteQuestion(params.id, user.id);
    response.redirect("/questions");
};

const getRandomQuestion = async ({ response }) => {
    let randId = 0;
    const res = await questionService.listQuestionsWithOptions();
    if (res && res.length>0) {
        const randomQuestion = res[Math.floor(Math.random()*res.length)];
        randId = randomQuestion.question_id;
    }
    
    response.redirect(`/quiz/${randId}`);
    
}

const showQuiz = async ({ params, render }) => {
    render("quiz.eta",{
        question: (await questionService.showQuestion(params.id))[0],
        options: await questionService.listOptions(params.id),
    });
};

const addAnswer = async ({ params, response, user }) => {
    const obj = (await questionService.showOption(params.optionId, params.id))[0];
    const correct = obj.is_correct;

    await questionService.addAnswer(user.id, params.id, params.optionId, correct);

    if (correct){
        response.redirect(`/quiz/${params.id}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/incorrect`);
    }

}

const processAnswer = async ({params, request, render}) => {
    let obj = {
        correct: true,
    };
    if (request.url.pathname.endsWith("/incorrect")) {
        obj.correct = false;
        const questionObj = (await questionService.correctOption(params.id))[0];
        obj.option_text = questionObj.option_text;
    }

    render("answer.eta",obj);
};

export { 
    listQuestions, 
    createQuestion,
    showQuestion,
    addOption,
    deleteOption,
    deleteQuestion,
    getRandomQuestion,
    showQuiz,
    addAnswer,
    processAnswer,
};