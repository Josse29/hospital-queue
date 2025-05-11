import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import poliRoutes from "./src/routes/Poli.js";
import screenRoutes from "./src/routes/Screen.js";
import hospitalRoutes from "./src/routes/Hospital.js";
// initial express app
const app = express();
// middleware cors
app.use(cors());
// configure dotenv
dotenv.config();
// parsing json in server
app.use(express.json());
// routes
app.use("/api/poli", poliRoutes);
app.use("/api/screen", screenRoutes);
app.use("/api/hospital", hospitalRoutes);
// connect to mongodb atlas/compas
const host = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medical";
const port = process.env.PORT || 8000;
mongoose
  .connect(host)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
