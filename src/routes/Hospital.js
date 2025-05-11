import express from "express";
import protect from "../utils/verifyAdmin.js";
import { getHospital, updateHospital } from "../controllers/Hospital.js";
const router = express.Router();
router.get("/", getHospital);
router.put("/:id", updateHospital);
export default router;
