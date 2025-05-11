import express from "express";
import {
  createPoli,
  deletePoli,
  printPoliQueue,
  readPoli,
  ringPoliQueue,
  updatePoli,
} from "../controllers/Poli.js";
import protect from "../utils/verifyAdmin.js";
const router = express.Router();
router.post("/", createPoli);
router.get("/", readPoli);
router.put("/:id", updatePoli);
router.delete("/:id", deletePoli);
router.put("/print-queue/:id", printPoliQueue);
router.put("/ring-queue/:id", ringPoliQueue);
export default router;
