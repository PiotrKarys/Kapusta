const express = require("express");
const router = express.Router();
const balance = require("../controller/user/updateBalance");
const currentUser = require("../controller/user/currentUser");
const authMiddleware = require("../middleware/authMiddleware");

router.patch("/balance", authMiddleware, balance);
router.get("/", authMiddleware, currentUser);

module.exports = router;
