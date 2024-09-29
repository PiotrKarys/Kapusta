const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/api/status", (req, res) => {
  res.json({ message: "Serwer Kapu$ta działa poprawnie" });
});

module.exports = router;
