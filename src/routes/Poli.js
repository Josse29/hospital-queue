import express from "express";
import {
  createPoli,
  deletePoli,
  readPoli,
  updatePoli,
} from "../controllers/Poli.js";
import protect from "../utils/verifyAdmin.js";
const router = express.Router();
router.post("/", createPoli);
router.get("/", readPoli);
router.put("/:id", updatePoli);
router.delete("/:id", deletePoli);
export default router;
