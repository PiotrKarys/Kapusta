const User = require("../../models/userModel");
const BlacklistedToken = require("../../models/BlackListedTokenModel");
const jwt = require("jsonwebtoken");

const logout = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.user.refreshToken;
    const sid = req.user.sid;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedAccess = jwt.verify(accessToken, process.env.JWT_SECRET);
    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );

    await BlacklistedToken.create({
      token: accessToken,
      expiresAt: new Date(decodedAccess.exp * 1000),
    });
    await BlacklistedToken.create({
      token: refreshToken,
      expiresAt: new Date(decodedRefresh.exp * 1000),
    });
    await BlacklistedToken.create({
      token: sid,
      expiresAt: new Date(decodedAccess.exp * 1000),
    });

    await User.findByIdAndUpdate(decodedAccess.id, {
      accessToken: null,
      refreshToken: null,
      sid: null,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
