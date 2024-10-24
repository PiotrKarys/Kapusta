const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../../models/userModel");
const { transactions } = require("../../models/transactionModel");

const login = async (req, res, next) => {
  try {
    const { nanoid } = await import("nanoid");
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("transactions");
    if (!user) {
      return res.status(403).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid email or password" });
    }
    const sid = nanoid();
    const payload = {
      id: user._id,
      email: user.email,
      sid,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.sid = sid;
    await user.save();

    const filteredTransactions = user.transactions.map(transaction => {
      return {
        _id: transaction._id,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
        category: transaction.category,
      };
    });
    res.status(200).json({
      accessToken,
      refreshToken,
      sid,
      user: {
        email: user.email,
        balance: parseFloat(user.balance.toString()),
        id: user.id,
        transactions: filteredTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
