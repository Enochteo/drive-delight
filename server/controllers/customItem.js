import { pool } from "../config/database.js";

// Server-side allowed option lists (should mirror client data)
const ALLOWED = {
  exterior: [
    "gloss_white",
    "midnight_black",
    "racing_red",
    "ocean_blue",
    "sunset_orange",
    "matte_graphite",
    "pearl_silver",
  ],
  roof: ["body_color", "panoramic", "carbon_fiber", "black_contrast"],
  wheels: ["17_standard", "18_sport", "19_alloy", "20_performance", "21_aero"],
  interior: [
    "cloth_black",
    "cloth_light_grey",
    "leather_black",
    "leather_tan",
    "vegan_white",
    "alcantara",
  ],
};

// Example incompatibility rules: array of checks returning a message when violated.
// Extend or replace these rules to match real business constraints.
const INCOMPATIBILITY_CHECKS = [
  // panoramic roof cannot be combined with carbon_fiber roof (nonsense example) -> show how to write rules
  ({ roof, exterior, wheels, interior }) => {
    if (roof === "panoramic" && exterior === "matte_graphite") {
      return "Panoramic roof is not available with Matte Graphite exterior.";
    }
    return null;
  },
  // example: certain interiors don't pair with bright exteriors
  ({ exterior, interior }) => {
    if (exterior === "racing_red" && interior === "vegan_white") {
      return "Vegan White interior is not available with Racing Red exterior.";
    }
    return null;
  },
];

function validateFeatureCombo({ exterior, roof, wheels, interior }) {
  // Check allowed values
  if (exterior && !ALLOWED.exterior.includes(exterior)) {
    return { valid: false, message: `Invalid exterior option: ${exterior}` };
  }
  if (roof && !ALLOWED.roof.includes(roof)) {
    return { valid: false, message: `Invalid roof option: ${roof}` };
  }
  if (wheels && !ALLOWED.wheels.includes(wheels)) {
    return { valid: false, message: `Invalid wheels option: ${wheels}` };
  }
  if (interior && !ALLOWED.interior.includes(interior)) {
    return { valid: false, message: `Invalid interior option: ${interior}` };
  }

  // Run incompatibility checks
  for (const check of INCOMPATIBILITY_CHECKS) {
    const msg = check({ exterior, roof, wheels, interior });
    if (msg) return { valid: false, message: msg };
  }

  return { valid: true };
}

const createCustomItem = async (req, res) => {
  const insertQuery = `INSERT INTO CustomCars (name, exterior, roof, wheels, interior) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const { name, exterior, roof, wheels, interior } = req.body;
  const values = [name, exterior, roof, wheels, interior];
  // Validate feature combo before inserting
  const validation = validateFeatureCombo({ exterior, roof, wheels, interior });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }
  try {
    const results = await pool.query(insertQuery, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const editCustomItem = async (req, res) => {
  const patchQuery = `UPDATE CustomCars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5 WHERE id = $6 RETURNING *;`;
  const id = parseInt(req.params.carId || req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }
  const { name, exterior, roof, wheels, interior } = req.body;
  // Validate feature combo before updating
  const validation = validateFeatureCombo({ exterior, roof, wheels, interior });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }
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
  const id = parseInt(req.params.carId || req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }
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
