const passport = require("passport");
const BlacklistedToken = require("../models/BlackListedTokenModel");

const authMiddleware = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;

    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.headers["x-refresh-token"];
    const sid = req.user.sid;

    const accessBlacklisted = await BlacklistedToken.findOne({
      token: accessToken,
    });
    const refreshBlacklisted = await BlacklistedToken.findOne({
      token: refreshToken,
    });
    const sidBlacklisted = await BlacklistedToken.findOne({
      token: sid,
    });

    if (accessBlacklisted || refreshBlacklisted || sidBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authMiddleware;
