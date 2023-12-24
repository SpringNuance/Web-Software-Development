import { executeQuery } from "../database/database.js";

const addAnswer = async(userId, questionId, optionId, isCorrect) => {
    await executeQuery("INSERT INTO question_answers(user_id, question_id, question_answer_option_id, correct) VALUES($1, $2, $3, $4)",
    userId, questionId, optionId, isCorrect);
};

const getUserAnswerCount = async(userId) => {
    const res = await executeQuery("SELECT COUNT(*) AS answer_count, COUNT(case correct when true then 1 else null end) as correct_count FROM question_answers WHERE user_id = $1;", userId);
    return res.rows;
};

const getUserCreatedQuestionsAndAnswers = async(userId) => {
    const res = await executeQuery(`SELECT question_text, COUNT(*) AS answer_count 
    FROM questions AS Q, question_answers AS QA 
    WHERE Q.id = QA.question_id AND Q.user_id = $1
    GROUP BY Q.question_text
    UNION
    SELECT question_text, 0 AS answer_count FROM questions
    WHERE id NOT IN (
      SELECT question_id FROM question_answers
    );`, userId
    );
    return res.rows;
};

const getFiveUsersWithMostAnswers = async() => {
    const res = await executeQuery(`SELECT users.email as email, count(*) as count FROM users
    JOIN question_answers ON users.id = question_answers.user_id
    GROUP BY users.email
    ORDER BY count DESC
    LIMIT 5;`
    );
    return res.rows;
};

export { 
    addAnswer,
    getUserAnswerCount, 
    getUserCreatedQuestionsAndAnswers,
    getFiveUsersWithMostAnswers,
 };