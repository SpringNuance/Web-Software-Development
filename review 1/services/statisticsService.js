import { executeQuery } from "../database/database.js";

const correctAnswers = async (userId) => {
    const res = await executeQuery(`
        SELECT count(*) as count FROM question_answers
        WHERE user_id=$1 GROUP BY correct HAVING correct=true;`,
        userId,
    );

    return res.rows;
};

const totalAnswerCount = async (userId) => {
    const res = await executeQuery(`
        SELECT count(*) as count FROM question_answers
        GROUP BY user_id HAVING user_id=$1`,
        userId,
    );

    return res.rows;
};

const answerCountToUserQuestions= async (userId) => {
    const res = await executeQuery(`
        SELECT count(*) as count
        FROM questions as q1, question_answers as q2
        WHERE q1.user_id = $1 AND q1.id=q2.question_id;`,
        userId,
    );

    return res.rows;
};

const fiveUsersWithMostAnswers = async () => {
    const res = await executeQuery(`
        SELECT users.email as email, count(*) as count FROM users
        JOIN question_answers ON users.id = question_answers.user_id
        GROUP BY users.email
        ORDER BY count DESC
        LIMIT 5`
    );
    return res.rows;
}

export {
    correctAnswers, 
    totalAnswerCount, 
    answerCountToUserQuestions,
    fiveUsersWithMostAnswers,
};

