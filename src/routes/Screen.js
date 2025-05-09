import express from "express";
// import protect from "../utils/verifyAdmin.js";
import {
  createScreen,
  deleteScreen,
  readScreen,
  readScreenId,
  updateScreen,
} from "../controllers/Screen.js";
const router = express.Router();
router.post("/", createScreen);
router.get("/", readScreen);
router.get("/:id", readScreenId);
router.put("/:id", updateScreen);
router.delete("/:id", deleteScreen);
export default router;
