import express from "express";
import customCtrl from "../controllers/customItem.js";
const router = express.Router();

router.get("/", customCtrl.getCustomItems);

router.get("/:carId", customCtrl.getCustomItem);

router.post("/", customCtrl.createCustomItem);

router.patch("/:carId", customCtrl.editCustomItem);

router.delete("/:carId", customCtrl.deleteCustomItem);

export default router;
