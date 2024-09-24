// const { Transaction } = require("../../models/transactionModel");

// const getExpenses = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const expenses = await Transaction.find({
//       user: userId,
//       type: "expense",
//     });

//     res.status(200).json(expenses);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getExpenses;

const { Transaction } = require("../../models/transactionModel");
const User = require("../../models/userModel");

const getExpenses = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const expenses = await Transaction.find({
      user: userId,
      type: "expense",
    });

    
    const monthStats = {};
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    monthNames.forEach((month) => {
      monthStats[month] = "N/A";
    });

    expenses.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      const monthName = monthNames[month];
      if (monthStats[monthName] === "N/A") {
        monthStats[monthName] = 0;
      }
      monthStats[monthName] += expense.amount;
    });

    res.status(200).json({
      expenses,
      monthStats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getExpenses;
