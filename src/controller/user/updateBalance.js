const User = require("../../models/userModel");
const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { balance } = req.body;

    if (balance === undefined) {
      return res.status(400).json({ message: "Balance is required" });
    }
    const user = await User.findByIdAndUpdate(_id, { balance }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      email: user.email,
      balance: user.balance,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = updateBalance;
