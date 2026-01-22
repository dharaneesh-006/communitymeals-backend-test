import User from "../models/User.js";

export const syncUser = async (req, res) => {
  const { uid } = req.user;

  let user = await User.findOne({ firebaseUid: uid });

  if (!user) {
    user = await User.create({
      firebaseUid: uid,
      role: "donor", // temporary, frontend controls role now
    });
  }

  res.json(user);
};
