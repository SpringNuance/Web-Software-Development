import { executeQuery } from "../database/database.js";

const create = async (name, address) => {
  await executeQuery(
    "INSERT INTO addresses (name, address) VALUES ($1, $2);",
    name,
    address,
  );
};

const deleteById = async (id) => {
  await executeQuery("DELETE FROM addresses WHERE id = $1;", id);
};

const findAll = async () => {
  let result = await executeQuery("SELECT * FROM addresses;");
  return result.rows;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  let result = await executeQuery(
    "SELECT * FROM addresses WHERE name ILIKE $1 OR address ILIKE $2;",
    likePart,
    likePart,
  );

  return result.rows;
};

export { create, deleteById, findAll, findByNameOrAddressLike };