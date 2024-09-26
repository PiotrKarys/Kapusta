const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const BlacklistedToken = require("../../models/BlackListedTokenModel");

async function refreshToken(req, res, next) {
  try {
    const { nanoid } = await import("nanoid");
    const { sid } = req.body;
    const refreshToken = req.headers.authorization.split(" ")[1];

    const blacklistedToken = await BlacklistedToken.findOne({
      token: refreshToken,
    });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Refresh token is blacklisted" });
    }

    if (!refreshToken || !sid) {
      return res
        .status(400)
        .json({ message: "Invalid request body / No token provided" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid refresh token" });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: "Invalid user" });
        }
        if (user.sid !== sid) {
          return res.status(401).json({ message: "Invalid user sid" });
        }
        const payload = {
          id: user._id,
          email: user.email,
        };
        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });
        const newRefreshToken = jwt.sign(
          payload,
          process.env.REFRESH_JWT_SECRET,
          { expiresIn: "7d" }
        );
        const newSid = nanoid();

        user.refreshToken = newRefreshToken;
        user.accessToken = newAccessToken;
        user.sid = newSid;
        await user.save();

        res.json({ newAccessToken, newRefreshToken, newSid });
      }
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { refreshToken };
