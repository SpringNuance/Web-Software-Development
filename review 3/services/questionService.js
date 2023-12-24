import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, title, question_text) => {
    await executeQuery(
        "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3);",
        user_id,
        title,
        question_text,
    );
};

const listQuestions = async (user_id) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE user_id = $1;",
        user_id
    );
    return res.rows;
};

const listAll = async () => {
    const res = await executeQuery(
        "SELECT * FROM questions;"
    );
    return res.rows;
};

const getQuestionById = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE id = $1;",
        id
    );

    return res.rows[0];
};

const removeQuestion = async (id) => {
    await executeQuery(
        "DELETE FROM questions WHERE id = $1;",
        id
    );
};



export { addQuestion, listQuestions, listAll, getQuestionById, removeQuestion };