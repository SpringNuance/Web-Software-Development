import * as answerService from "../../services/answerService.js";
import * as optionService from "../../services/optionService.js";


const addAnswer = async ({ user, params, response }) => {
    
    const option = await optionService.findOption(params.optionId);
    const correct = option.is_correct;

    await answerService.addAnswer(user.id, params.id, params.optionId, correct);

    if (!correct) {
        response.redirect(`/quiz/${params.id}/incorrect`);
    }
    else { 
        response.redirect(`/quiz/${params.id}/correct`);
    }
};

const showCorrect = async ({ render }) => {
    render("correct.eta");
};

const showIncorrect = async ({ params, render }) => {
    const res = await answerService.getCorrectAnswer(params.id);

    render("incorrect.eta", {corrects: res} );
};

const data = {
    answers: 0,
    trues: 0,
    userQuestions: 0
};

const showStatics = async ({ user, render }) => {
    //Number of answers user has given
    const allres = await answerService.numberOfAnswers(user.id);
    data.answers = allres[0].count;
    //Number of correct answers user has given
    const trueres = await answerService.numberOfCorrectAnswers(user.id);
    data.trues = trueres[0].count;
    //Number of answers given to users questions
    const userQuestions = await answerService.numberOfAnswersForUsersQuestions(user.id);
    data.questionAnswers = userQuestions[0].count;
    //Top players
    const topPlayers = await answerService.getTop5();
    if (topPlayers.length >= 5) {
        data.top5 = topPlayers.slice(0, 5)
    } else {
        data.top5 = topPlayers
    }
    

    render("statistics.eta", data );
};


export { addAnswer, showStatics, showCorrect, showIncorrect };