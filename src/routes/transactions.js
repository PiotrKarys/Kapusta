const express = require("express");
const router = express.Router();
const getExpenses = require("../controller/transactions/getExpenses");
const addExpense = require("../controller/transactions/addExpense");
const getIncomes = require("../controller/transactions/getIncomes");
const addIncome = require("../controller/transactions/addInome");
const deleteTransaction = require("../controller/transactions/deleteTransaction");
const getTransactionsPeriodData = require("../controller/transactions/periodData");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getExpenseCategories,
  getIncomeCategories,
} = require("../controller/categories/getCategoriesController");

router.get("/expense", authMiddleware, getExpenses);

router.post("/expense", authMiddleware, addExpense);

router.get("/income", authMiddleware, getIncomes);

router.post("/income", authMiddleware, addIncome);

router.delete("/:transactionId", authMiddleware, deleteTransaction);

router.get("/income-categories", authMiddleware, getIncomeCategories);

router.get("/expense-categories", authMiddleware, getExpenseCategories);

router.get("/period-data", authMiddleware, getTransactionsPeriodData);

module.exports = router;
