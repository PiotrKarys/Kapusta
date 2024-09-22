const mongoose = require("mongoose");

const visitorCounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const VisitorCounter = mongoose.model("VisitorCounter", visitorCounterSchema);

module.exports = VisitorCounter;
