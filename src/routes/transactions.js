const express = require("express");
const router = express.Router();
const getExpenses = require("../controller/transactions/getExpenses");
const addExpense = require("../controller/transactions/addExpense");
const getIncomes = require("../controller/transactions/getIncomes");
const addIncome = require("../controller/transactions/addInome");
const getTransactionsPeriodData = require("../controller/transactions/periodData");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/expense", authMiddleware, getExpenses);
router.post("/expense", authMiddleware, addExpense);
router.get("/income", authMiddleware, getIncomes);
router.post("/income", authMiddleware, addIncome);
router.get("/period-data", authMiddleware, getTransactionsPeriodData);
module.exports = router;
