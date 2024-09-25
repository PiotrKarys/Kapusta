const express = require("express");
const router = express.Router();
const getExpenses = require("../controller/transactions/getExpenses");
const addExpense = require("../controller/transactions/addExpense");
const getIncomes = require("../controller/transactions/getIncomes")
const addIncome = require("../controller/transactions/addInome")

const authMiddleware = require("../middleware/authMiddleware");

router.get("/expense", authMiddleware, getExpenses);
router.post("/expense", authMiddleware, addExpense);
router.get("/income", authMiddleware, getIncomes);
router.post("/income", authMiddleware, addIncome);

module.exports = router;
