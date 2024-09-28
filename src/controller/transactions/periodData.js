const { Transaction } = require("../../models/transactionModel");
const { periodDataSchema } = require("../../utils/validationSchemas");

const getTransactionsPeriodData = async (req, res, next) => {
  try {
    const { error } = periodDataSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const { date } = req.query;
    const userId = req.user._id;

    const [year, month] = date.split("-");
    let startDate, endDate;

    if (month) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0, 23, 59, 59);
    } else {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31, 23, 59, 59);
    }

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
        t.category.forEach(cat => {
          if (!result.incomes.incomesData[cat]) {
            result.incomes.incomesData[cat] = { total: 0 };
          }
          result.incomes.incomesData[cat].total += t.amount;
          result.incomes.incomesData[cat][t.description] =
            (result.incomes.incomesData[cat][t.description] || 0) + t.amount;
        });
      } else {
        result.expenses.total += t.amount;
        t.category.forEach(cat => {
          if (!result.expenses.expensesData[cat]) {
            result.expenses.expensesData[cat] = { total: 0 };
          }
          result.expenses.expensesData[cat].total += t.amount;
          result.expenses.expensesData[cat][t.description] =
            (result.expenses.expensesData[cat][t.description] || 0) + t.amount;
        });
      }
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactionsPeriodData;
