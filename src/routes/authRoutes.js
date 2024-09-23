const express = require("express");
const router = express.Router();
const { signup } = require("../controller/authentication/registerController");
const { login } = require("../controller/authentication/loginController");
const { logout } = require("../controller/authentication/logoutController");
const { validateBody } = require("../middleware/validationMiddleware");
const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../utils/validationSchemas");
const {
  refreshToken,
} = require("../controller/authentication/refreshTokenController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", validateBody(registerSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.post("/refresh", validateBody(refreshTokenSchema), refreshToken);

module.exports = router;
