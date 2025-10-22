import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the repository root relative to this file (server/config)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env");

dotenv.config({ path: envPath });
