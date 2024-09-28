const {
  incomeCategories,
  expenseCategories,
} = require("../../models/transactionModel");

const getExpenseCategories = async (req, res) => {
  try {
    res.status(200).json(expenseCategories);
  } catch (error) {
    next(error);
  }
};

const getIncomeCategories = async (req, res) => {
  try {
    res.status(200).json(incomeCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = { getExpenseCategories, getIncomeCategories };
