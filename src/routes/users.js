const express = require("express");
const router = express.Router();
const balance = require("../controller/user/updateBalance");
const currentUser = require("../controller/user/currentUser");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /user/balance:
 *   patch:
 *     summary: Update user balance
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: User balance updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
router.patch("/balance", authMiddleware, balance);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get current user information
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 balance:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, currentUser);
module.exports = router;
