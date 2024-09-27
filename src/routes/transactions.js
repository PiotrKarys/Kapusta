const express = require("express");
const router = express.Router();
const getExpenses = require("../controller/transactions/getExpenses");
const addExpense = require("../controller/transactions/addExpense");
const getIncomes = require("../controller/transactions/getIncomes");
const addIncome = require("../controller/transactions/addInome");
const getTransactionsPeriodData = require("../controller/transactions/periodData");
const authMiddleware = require("../middleware/authMiddleware");
/**
 * @swagger
 * /transaction/expense:
 *   get:
 *     summary: Get all expenses for the user
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       description:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                         format: date
 *                       category:
 *                         type: string
 *                 monthStats:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get("/expense", authMiddleware, getExpenses);
/**
 * @swagger
 * /transaction/expense:
 *   post:
 *     summary: Add a new expense
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense added successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/expense", authMiddleware, addExpense);
/**
 * @swagger
 * /transaction/income:
 *   get:
 *     summary: Get all incomes for the user
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of incomes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 incomes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       description:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                         format: date
 *                       category:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/income", authMiddleware, getIncomes);
/**
 * @swagger
 * /transaction/income:
 *   post:
 *     summary: Add a new income
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Income added successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/income", authMiddleware, addIncome);
/**
 * @swagger
 * /transaction/period-data:
 *   get:
 *     summary: Get transactions for a specific period
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         description: Date in YYYY-MM format
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of transactions for the specified period
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 incomes:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     incomesData:
 *                       type: object
 *                 expenses:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     expensesData:
 *                       type: object
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized
 */
router.get("/period-data", authMiddleware, getTransactionsPeriodData);
module.exports = router;
