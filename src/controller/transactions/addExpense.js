const { Transaction, expenseCategories } = require("../../models/transactionModel");
const User = require("../../models/userModel")

const addExpense = async (req, res, next) => {
  try {
    const { description, amount, date, category } = req.body;
    const userId = req.user._id;

    if (!description || !amount || !date || !category) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    if (!expenseCategories.includes(category)) {
      return res
        .status(400)
        .json({ message: `Invalid category, try: ${expenseCategories} ` });
    }

    const newTransaction = new Transaction({
      description,
      amount,
      date,
      category,
      type: "expense",
      user: userId,
    });
      
      await newTransaction.save();

       const user = await User.findById(userId);
       user.transactions.push(newTransaction._id); 

       
       user.balance -= amount; 

       
       await user.save();

    

    const expenses = await Transaction.aggregate([
      { $match: { user: userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const newBalance = expenses.length ? -expenses[0].total : 0;

    res.status(200).json({
      newBalance,
      transaction: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addExpense;
