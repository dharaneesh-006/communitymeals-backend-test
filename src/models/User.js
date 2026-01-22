import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true },
  role: String,
  restaurantLocation: {
    lat: Number,
    lng: Number,
  },
});

export default mongoose.model("User", UserSchema);
