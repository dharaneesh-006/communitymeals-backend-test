import express from "express";
import cors from "cors";
import foodRoutes from "./routes/foodRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/food", foodRoutes);
app.use("/api/user", userRoutes);
export default app;
