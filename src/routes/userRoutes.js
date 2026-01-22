import express from "express";
import firebaseAuth from "../middleware/firebaseAuth.js";
import { syncUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/sync", firebaseAuth, syncUser);

export default router;
