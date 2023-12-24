import * as questionAnswerService from "../../services/questionAnswerService.js";


const showStatistics = async({ render, user }) => {
    const myData = await questionAnswerService.getUserAnswerCount(user.id);
    const myQuestionData = await questionAnswerService.getUserCreatedQuestionsAndAnswers(user.id);
    const topFive = await questionAnswerService.getFiveUsersWithMostAnswers();
    const renderData = {
        myAnswerCount: (myData && myData.length > 0) ? myData[0].answer_count : "Unknown",
        myCorrectCount: (myData && myData.length > 0) ? myData[0].correct_count : "Unknown",
        questions: myQuestionData,
        topUsers: topFive,
    }
    render("statistics.eta", renderData);
};
  
export { showStatistics };