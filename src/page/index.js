const express = require("express");
const router = express.Router();
const VisitorCounter = require("../models/visitorCounterModel");

router.get("/", async (req, res) => {
  try {
    let counter = await VisitorCounter.findOne();
    if (!counter) {
      counter = new VisitorCounter();
    }
    counter.count += 1;
    await counter.save();

    res.render("index", { visitorCount: counter.count });
  } catch (error) {
    console.error("Błąd przy aktualizacji licznika:", error);
    res.status(500).send("Wystąpił błąd serwera");
  }
});

module.exports = router;
