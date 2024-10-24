const User = require("../../models/userModel");
const mongoose = require("mongoose");
const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { balance } = req.body;
    const balanceDecimal = mongoose.Types.Decimal128.fromString(
      balance.toFixed(2)
    );

    if (balance === undefined) {
      return res.status(400).json({ message: "Balance is required" });
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { balance: balanceDecimal },
      { new: true }
    );
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
