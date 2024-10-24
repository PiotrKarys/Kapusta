const { Transaction } = require("../../models/transactionModel");
const User = require("../../models/userModel");
const mongoose = require("mongoose");

const deleteTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user._id;

    if (!transactionId) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(transactionId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }

    user.transactions = user.transactions.filter(
      id => id.toString() !== transactionId
    );

    if (transaction.type === "income") {
      user.balance = mongoose.Types.Decimal128.fromString(
        (parseFloat(user.balance) - transaction.amount).toFixed(2)
      );
    } else if (transaction.type === "expense") {
      user.balance = mongoose.Types.Decimal128.fromString(
        (parseFloat(user.balance) + transaction.amount).toFixed(2)
      );
    }

    await user.save();

    res.status(200).json({
      newBalance: user.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteTransaction;
