const User = require("../../models/userModel");
const bcryptjs = require("bcryptjs");

async function signup(req, res, next) {
  try {
    const { nanoid } = await import("nanoid");

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email in use",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      id: nanoid(),
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created",
      user: {
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
};
