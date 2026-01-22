import Food from "../models/Food.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Add Food
export const addFood = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const file = req.file;

    if (!name || !quantity || !file) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Find donor
    const user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "food-donations",
    });

    const food = await Food.create({
      donorId: user._id,
      name,
      quantity,
      imageUrl: result.secure_url,
    });

    res.status(201).json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add food failed" });
  }
};

// 📜 Get donor food history
export const getMyFoods = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });

    const foods = await Food.find({ donorId: user._id }).sort({
      createdAt: -1,
    });

    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// 🔴 Mark food as sold
export const markFoodSold = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.status = "sold";
    await food.save();

    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
