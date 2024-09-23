const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../../models/userModel");
const { transactions } = require("../../models/transactionModel");
const login = async (req, res, next) => {
  try {
    const { nanoid } = await import("nanoid");
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });
    user.token = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Successful operation",
      accessToken,
      refreshToken,
      sid,
      userData: {
        email: user.email,
        balance: user.balance,
        id: user.id,
        transactions: user.transactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
