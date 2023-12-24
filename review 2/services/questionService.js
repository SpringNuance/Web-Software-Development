import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, questionText) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3);`,
    userId,
    title,
    questionText
  );
};

const deleteQuestion = async(id, userID) => {
  await executeQuery("DELETE FROM questions WHERE id = $1 AND user_id = $2", id, userID);
};

const getQuestionsByUser = async (userId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE user_id = $1;", userId);
    return res.rows;
};

const getQuestionInfo = async (id) => {
  const res = await executeQuery("SELECT * FROM questions WHERE id = $1", id);
  return res.rows;
};

const getRandomQuestion = async () => {
  const res = await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;");
  return res.rows;
};




export { 
  addQuestion, 
  getQuestionsByUser,
  getQuestionInfo,
  deleteQuestion, 
  getRandomQuestion,
};