import { pool } from "./database.js";
import "./dotenv.js";

const createTableQuery = `DROP TABLE IF EXISTS CustomCar;
                            CREATE TABLE IF NOT EXISTS CustomCar(
                                id SERIAL PRIMARY KEY,
                                exterior VARCHAR(255) NOT NULL,
                                roof VARCHAR(255) NOT NULL,
                                wheels VARCHAR(255) NOT NULL,
                                interior VARCHAR(255) NOT NULL
                            );`;

const createTable = async () => {
  try {
    const res = await pool.query(createTableQuery);
    console.log("👊 Your Car Table has been created");
  } catch (error) {
    console.error("❌ Error Creating Car Table:", error);
  }
};

createTable();
