import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  quantity: String,
  imageUrl: String,
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Food", FoodSchema);
