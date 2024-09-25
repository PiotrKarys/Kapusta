const { Transaction } = require("../../models/transactionModel");

const getIncomes = async (req, res, next) => {
  try {
    const userId = req.user._id;

    
    const incomes = await Transaction.find({
      user: userId,
      type: "income",
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

    
    incomes.forEach((income) => {
      const month = new Date(income.date).getMonth();
      const monthName = monthNames[month];
      if (monthStats[monthName] === "N/A") {
        monthStats[monthName] = 0;
      }
      monthStats[monthName] += income.amount;
    });

   
    res.status(200).json({
      incomes,
      monthStats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getIncomes;
