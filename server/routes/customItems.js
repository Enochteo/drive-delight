import express from "express";
import {
  createCustomItem,
  editCustomItem,
  deleteCustomItem,
  getCustomItem,
  getCustomItems,
} from "../controllers/customItem.js";
const router = express.Router();

router.get("/", getCustomItems);

router.get("/:carId", getCustomItem);

router.post("/", createCustomItem);

router.patch("/:carId", editCustomItem);

router.delete("/:carId", deleteCustomItem);

export default router;
