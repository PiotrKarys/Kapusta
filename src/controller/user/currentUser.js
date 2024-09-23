const User = require("../../models/userModel");

const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = currentUser;
