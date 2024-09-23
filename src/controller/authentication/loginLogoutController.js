const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../../models/userModel");
const { transactions } = require("../../models/transactionModel");

async function login(req, res, next) {
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
        transactions: user.transactions,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
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
}
module.exports = { login, logout };
