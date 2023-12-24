import { executeQuery } from "../database/database.js";

const getQuestionAnswerOptions = async (questionId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $1", questionId);
    return res.rows;
};

const getAnswerOptionInfo = async (optionId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE id = $1", optionId);
    return res.rows;
};

const getCorrectAnswerText = async (questionId) => {
    const res = await executeQuery("SELECT option_text FROM question_answer_options WHERE is_correct = true AND question_id = $1", questionId);
    if (res.rows && res.rows.length > 0) {
        return res.rows[0].option_text;
    } else {
        return "None!"
    }
};

const checkAnswer = async (optionId) => {
    const res = await executeQuery("SELECT is_correct FROM question_answer_options WHERE id = $1", optionId);
    if (res.rows && res.rows.length > 0) {
        return res.rows[0].is_correct;
    }
}

const checkOwnerOfQuestion = async (id, userId) => {
    const res = await executeQuery("SELECT user_id FROM questions WHERE id = $1", id);
    if (res.rows && res.rows.length > 0) {
        return res.rows[0].user_id === userId;
    }
    return false;
}
  
const addAnswerOption = async(questionId, optionText, isCorrect) => {
    await executeQuery("INSERT INTO question_answer_options(question_id, option_text, is_correct) VALUES($1, $2, $3)", 
      questionId, optionText, isCorrect);
};
  
const deleteAnswerOption = async(questionID, answerID) => {
    // First delete any possible question answers for the specific answer option
    await executeQuery("DELETE FROM question_answers WHERE question_id = $1 AND question_answer_option_id = $2;", questionID, answerID);
    // Then delete the option itself
    await executeQuery("DELETE FROM question_answer_options WHERE question_id = $1 AND id = $2;", questionID, answerID);
};

const checkApiAnswer = async(questionID, optionID) => {
    // This also checks whether the given optionID is for the question defined in the JSON body...
    // If it's not, we return false
    const res = await executeQuery(`SELECT is_correct AS correct
    FROM question_answer_options AS QAO
    WHERE QAO.question_id = $1 AND QAO.id = $2`, questionID, optionID);
    if (res.rows && res.rows.length > 0) {
        return res.rows[0];
    } 
    return { "correct": false };
};

export { 
    addAnswerOption, 
    deleteAnswerOption, 
    getQuestionAnswerOptions, 
    getAnswerOptionInfo, 
    getCorrectAnswerText, 
    checkAnswer,
    checkOwnerOfQuestion,
    checkApiAnswer,
 };