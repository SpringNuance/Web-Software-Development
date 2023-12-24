import { executeQuery } from "../database/database.js";

const addChore = async (userId, title, description, chorecoins, dueDate) => {
  await executeQuery(
    `INSERT INTO chores
      (user_id, title, description, chorecoins, due_date)
        VALUES ($1, $2, $3, $4, $5)`,
    userId,
    title,
    description,
    chorecoins,
    dueDate,
  );
};

const claimChore = async (choreId, userId) => {
  await executeQuery(
    `INSERT INTO chore_assignments
    (chore_id, user_id, created_at) VALUES
      ($1, $2, NOW())`,
    choreId,
    userId,
  );
};

const listChores = async () => {
  const res = await executeQuery(`SELECT * FROM chores
      WHERE (due_date IS NULL OR due_date > NOW())
    `);

  return res.rows;
};

const listAvailableChores = async () => {
  const res = await executeQuery(`SELECT * FROM chores
      WHERE (due_date IS NULL OR due_date > NOW())
      AND id NOT IN (SELECT chore_id FROM chore_assignments)
    `);

  return res.rows;
};

const listUserChores = async (userId) => {
  const res = await executeQuery(
    `SELECT * FROM chores
      WHERE id IN (
        SELECT chore_id FROM chore_assignments
          WHERE user_id = $1 AND completed_at IS NULL
      )
    `,
    userId,
  );

  return res.rows;
};

const completeChore = async (choreId, userId) => {
  await executeQuery(
    `UPDATE chore_assignments SET completed_at = NOW()
        WHERE chore_id = $1 AND user_id = $2`,
    choreId,
    userId,
  );

  const coinsRes = await executeQuery(
    "SELECT chorecoins FROM chores WHERE id = $1",
    choreId,
  );

  const coins = coinsRes[0].chorecoins;
  if (coins === 0) {
    return;
  }

  await executeQuery(
    `UPDATE users SET
        chorecoins = chorecoins + $1
        WHERE id = $2`,
    coins,
    userId,
  );

  await executeQuery(
    `UPDATE users SET
        chorecoins = chorecoins - $1
        WHERE id IN (SELECT user_id FROM chores WHERE id = $2)`,
    coins,
    choreId,
  );
};

//
export {
  addChore,
  claimChore,
  completeChore,
  listAvailableChores,
  listChores,
  listUserChores,
};