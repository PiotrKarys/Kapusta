const express = require("express");
const router = express.Router();
const getExpenses = require("../controller/transactions/getExpenses");
const addExpense = require("../controller/transactions/addExpense");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/expense", authMiddleware, getExpenses);
router.post("/expense", authMiddleware, addExpense);

module.exports = router;
