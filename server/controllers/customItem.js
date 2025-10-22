import { pool } from "../config/database.js";

const createCustomItem = async (req, res) => {
  const insertQuery = `INSERT INTO CustomCars (name, exterior, roof, wheels, interior) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const { name, exterior, roof, wheels, interior } = req.body;
  const values = [name, exterior, roof, wheels, interior];
  try {
    const results = await pool.query(insertQuery, values);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const editCustomItem = async (req, res) => {
  const patchQuery = `UPDATE CustomCars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5 WHERE id = $6 RETURNING *;`;
  const id = parseInt(req.params.id);
  const { name, exterior, roof, wheels, interior } = req.body;
  try {
    const results = await pool.query(patchQuery, [
      name,
      exterior,
      roof,
      wheels,
      interior,
      id,
    ]);
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car with this id not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteCustomItem = async (req, res) => {
  const deleteQuery = `DELETE FROM CustomCars WHERE id = $1;`;
  const id = parseInt(req.params.id, 10);
  try {
    const results = await pool.query(deleteQuery, [id]);
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "Car with this id not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCustomItems = async (req, res) => {
  const getItemsQuery = `SELECT id, name, exterior, roof, wheels, interior FROM CustomCars;`;
  try {
    const results = await pool.query(getItemsQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCustomItem = async (req, res) => {
  const getItemQuery = `SELECT id, name, exterior, roof, wheels, interior FROM CustomCars WHERE id = $1;`;
  try {
    const id = parseInt(req.params.id || req.params.carId, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id parameter" });
    }
    const results = await pool.query(getItemQuery, [id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car with this ID not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createCustomItem,
  editCustomItem,
  deleteCustomItem,
  getCustomItem,
  getCustomItems,
};
