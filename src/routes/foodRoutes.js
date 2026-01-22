import express from "express";
import firebaseAuth from "../middleware/firebaseAuth.js";
import upload from "../middleware/upload.js";
import {
  addFood,
  getMyFoods,
  markFoodSold,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/", firebaseAuth, upload.single("image"), addFood);
router.get("/my", firebaseAuth, getMyFoods);
router.patch("/:id/sold", firebaseAuth, markFoodSold);

export default router;
