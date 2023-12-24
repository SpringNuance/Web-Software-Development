import { executeQuery } from "../database/database.js";

/* PART 1 */ 
//  listing projects.
const listAllProjects = async () => {
  let result = await executeQuery("SELECT * FROM projects;");
  return result.rows;
};

// creating projects
const create = async (name) => {
  await executeQuery("INSERT INTO projects (name) VALUES ($1);", name);
};

// remove projects
const removeById = async (id) => {
  await executeQuery("DELETE FROM projects WHERE id = $1;", id);
};


export { listAllProjects, create, removeById };

/*
import { executeQuery } from "../database/database.js";

const completeById = async (id) => {
  await executeQuery("UPDATE tasks SET completed = true WHERE id = $1;", id);
};

// creating tasks
const create = async (name) => {
  await executeQuery("INSERT INTO tasks (name) VALUES ($1);", name);
};

//  listing tasks.
const findAllNonCompletedTasks = async () => {
  let result = await executeQuery(
    "SELECT * FROM tasks WHERE completed = false;",
  );
  return result.rows;
};

const findById = async (id) => {
  let result = await executeQuery("SELECT * FROM tasks WHERE id = $1;", id);
  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }
  
  return { id: 0, name: "Unknown" };
};

export { completeById, create, findAllNonCompletedTasks, findById };
*/