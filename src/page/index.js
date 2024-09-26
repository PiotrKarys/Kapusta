const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is operational and functioning correctly.");
});

module.exports = router;
