import { executeQuery } from "../database/database.js";

const add = async (name) => {
  await executeQuery("INSERT INTO names (name) VALUES ($1);", name);
}

const findAll = async () => {
   const result = await executeQuery("SELECT * FROM names;");
    if (result) {
        return result.rows;
    }

    return [];
};

export { add, findAll };