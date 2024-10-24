const User = require("../../models/userModel");
const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate("transactions");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      email: user.email,
      balance: parseFloat(user.balance.toString()),
      transactions: user.transactions,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = currentUser;
