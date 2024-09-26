const cron = require("node-cron");
const BlacklistedToken = require("../models/BlackListedTokenModel");

const cleanupBlacklist = () => {
  cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    await BlacklistedToken.deleteMany({ expiresAt: { $lt: now } });
    console.log("Cleaned up expired tokens from blacklist");
  });
};

module.exports = cleanupBlacklist;
