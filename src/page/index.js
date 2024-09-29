const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/scripts.js", (req, res) => {
  res.sendFile(path.join(__dirname, "scripts.js"));
});

router.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "styles.css"));
});

module.exports = router;
