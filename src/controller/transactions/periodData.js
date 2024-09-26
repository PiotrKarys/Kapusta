const { Transaction } = require("../../models/transactionModel");

const getTransactionsPeriodData = async (req, res, next) => {
  try {
    const { date, type } = req.query;
    const userId = req.user._id;

    if (!date || !/^\d{4}(-\d{2})?$/.test(date)) {
      return res.status(400).json({
        message: "Invalid date format. Please use YYYY-MM or YYYY format.",
      });
    }

    const [year, month] = date.split("-");
    const startDate = month
      ? new Date(year, month - 1, 1)
      : new Date(year, 0, 1);
    const endDate = month
      ? new Date(year, month, 0, 23, 59, 59)
      : new Date(year, 11, 31, 23, 59, 59);

    const transactions = await Transaction.find({
      user: userId,
      //mongo db wieksze lub rowne
      date: { $gte: startDate, $lte: endDate },
    });

    const result = {
      incomes: {
        total: 0,
        incomesData: {},
      },
      expenses: {
        total: 0,
        expensesData: {},
      },
    };

    transactions.forEach(t => {
      if (t.type === "income") {
        result.incomes.total += t.amount;
        if (!result.incomes.incomesData[t.category]) {
          result.incomes.incomesData[t.category] = { total: 0 };
        }
        result.incomes.incomesData[t.category].total += t.amount;
        result.incomes.incomesData[t.category][t.description] =
          (result.incomes.incomesData[t.category][t.description] || 0) +
          t.amount;
      } else {
        result.expenses.total += t.amount;
        if (!result.expenses.expensesData[t.category]) {
          result.expenses.expensesData[t.category] = { total: 0 };
        }
        result.expenses.expensesData[t.category].total += t.amount;
        result.expenses.expensesData[t.category][t.description] =
          (result.expenses.expensesData[t.category][t.description] || 0) +
          t.amount;
      }
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactionsPeriodData;
