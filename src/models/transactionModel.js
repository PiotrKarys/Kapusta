const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeCategories = ["Salary", "Additional Income"];

const expenseCategories = [
  "Food",
  "Alcohol",
  "Entertainment",
  "Health",
  "Transport",
  "Housing",
  "Technique",
  "Utilities and Communications",
  "Sports and Hobbies",
  "Education",
  "Other",
];

const transactionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        if (this.type === "income") {
          return incomeCategories.includes(v);
        } else {
          return expenseCategories.includes(v);
        }
      },
    },
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

transactionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.date = obj.date.toISOString().split("T")[0];
  return obj;
};

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction, incomeCategories, expenseCategories };
