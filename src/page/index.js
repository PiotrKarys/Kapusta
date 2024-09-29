const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/scripts.js", (req, res) => {
  res.sendFile(path.join(__dirname, "cabbage.js"));
});

router.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "styles.css"));
});

router.get("/api/status", (req, res) => {
  res.json({ message: "Serwer Kapu$ta działa poprawnie" });
});

module.exports = router;
