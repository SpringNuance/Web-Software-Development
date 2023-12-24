import { executeQuery } from "../database/database.js";


const addAnswer = async (user_id, question_id, question_answer_option_id, correct) => {
    await executeQuery(
        "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4);",
        user_id,
        question_id,
        question_answer_option_id,
        correct,
    );
};

const numberOfAnswers = async (user_id) => {
    const res = await executeQuery(
        "SELECT COUNT(id) as count FROM question_answers WHERE user_id = $1;",
        user_id
    );
    return res.rows;
};

const numberOfCorrectAnswers = async (user_id) => {
    const res = await executeQuery(
        "SELECT COUNT(id) as count FROM question_answers WHERE user_id = $1 AND correct = true;",
        user_id
    );
    return res.rows;
};

const getCorrectAnswer = async (question_id) => {
    const res = await executeQuery(
        "SELECT option_text as text, id FROM question_answer_options WHERE question_id = $1 AND is_correct = true;",
        question_id
    );
    return res.rows;
};

const numberOfAnswersForUsersQuestions = async (user_id) => {
    const res = await executeQuery(
        "SELECT COUNT(id) FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE user_id = $1);",
        user_id
    );
    return res.rows;
}

const getTop5 = async () => {
    const res = await executeQuery(
        "SELECT count(u.id), u.email FROM users as u LEFT JOIN question_answers ON question_answers.user_id = u.id GROUP BY u.id ORDER BY COUNT(u.id) desc;"
    );
    return res.rows;
};


export { addAnswer, numberOfAnswers, numberOfCorrectAnswers, getCorrectAnswer, numberOfAnswersForUsersQuestions, getTop5 };