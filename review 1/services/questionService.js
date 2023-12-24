import { executeQuery } from "../database/database.js";


const addAnswer = async (userId, questionId, optionId, correct) => {
    await executeQuery(`
        INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id, correct)
        VALUES ($1,$2,$3,$4)`,
        userId,
        questionId,
        optionId,
        correct,
    );
};


const addOption = async (questionId, optionText, isCorrect) => {
    await executeQuery(`
        INSERT INTO question_answer_options 
        (question_id, option_text, is_correct) 
        VALUES ($1,$2,$3);`,
        questionId,
        optionText,
        isCorrect,
    );
};


const addQuestion = async (userId, title, questionText) => {
    await executeQuery("INSERT INTO questions (user_id, title, question_text) VALUES ($1,$2,$3);",
        userId,
        title,
        questionText,
    );
};


const correctOption = async (questionId) => {
    const res = await executeQuery(`
        SELECT option_text FROM question_answer_options
        WHERE question_id=$1 AND is_correct=true;`,
        questionId,
    );
    return res.rows;
};

//Note! If there question answers, the question answers for the specific answer option are also removed.
const deleteOption = async (questionId, optionId) => {
    await executeQuery(`
        DELETE FROM question_answers
        WHERE question_id=$1 AND question_answer_option_id=$2;`,
        questionId,
        optionId,
    );

    await executeQuery(`
        DELETE FROM question_answer_options
        WHERE id=$1 AND question_id=$2;`,
        optionId,
        questionId,
    );
};


const deleteQuestion = async (questionId, userId) => {
    await executeQuery(`
        DELETE FROM questions WHERE
        id=$1 AND user_id=$2;`,
        questionId,
        userId,
    );
};


const listOptions = async (questionId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1;",
        questionId,
    );

    return res.rows;
};

const listQuestions = async () => {
    const res = await executeQuery("SELECT * FROM questions;");
    return res.rows;
} 

const listQuestionsWithOptions = async () => {
    const res = await executeQuery("SELECT * FROM question_answer_options;");
    return res.rows;
};


const listUserQuestions = async (userId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE user_id=$1;", userId);

    return res.rows;
};


const showOption = async (optionId, questionId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE id=$1 AND question_id=$2;", 
        optionId,
        questionId,
    );
    return res.rows;
};

const showQuestion = async (questionId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id=$1", questionId);
    return res.rows;
};

const showQuestionById = async (questionId, userId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id=$1 AND user_id=$2;",
        questionId,
        userId,
    );

    return res.rows;
};


export { 
    listUserQuestions, 
    addQuestion,
    showQuestionById,
    addOption,
    listOptions,
    deleteOption,
    deleteQuestion,
    listQuestionsWithOptions,
    showQuestion,
    addAnswer,
    showOption,
    correctOption,
    listQuestions,
};