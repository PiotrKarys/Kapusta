const User = require("../../models/userModel");

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOneAndUpdate(
      { token },
      { $set: { token: null, refreshToken: null } },
      { new: true }
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = { logout };
