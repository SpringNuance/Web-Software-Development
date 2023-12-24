import * as statisticsService from "../../services/statisticsService.js";

//Helper function to get the data
const getStatisticsData = async (userId) => {
    const totalCountObj = await statisticsService.totalAnswerCount(userId);
    const correctCountObj = await statisticsService.correctAnswers(userId);
    const countToQuestions = await statisticsService.answerCountToUserQuestions(userId);

    const obj = {
        totalCount: 0,
        correctCount: 0,
        questionsCount: 0,
        mostAnswers: await statisticsService.fiveUsersWithMostAnswers(),
    };

    if (totalCountObj && totalCountObj.length>0) {
        obj.totalCount = (totalCountObj[0]).count;
    }

    if (correctCountObj && correctCountObj.length>0) {
        obj.correctCount = (correctCountObj[0]).count;
    }

    if (countToQuestions && countToQuestions.length>0) {
        obj.questionsCount = (countToQuestions[0]).count;
    }

    return obj;
};

const showUserStatistics = async ({ render,user }) => {
    render("statistics.eta", await getStatisticsData(user.id));
};

export { showUserStatistics };