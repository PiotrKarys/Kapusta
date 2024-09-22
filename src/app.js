const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("../config/passport");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./page");
const path = require("path");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "page")));
app.use(passport.initialize());

app.use("/", pageRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

module.exports = app;
