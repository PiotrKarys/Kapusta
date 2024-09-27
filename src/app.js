const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("../config/passport");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./page");
const path = require("path");
const users = require("./routes/users");
const transactions = require("./routes/transactions");
const cleanupBlacklist = require("./utils/cleanupBlacklist");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
cleanupBlacklist();
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "page")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use(passport.initialize());

app.use("/", pageRoutes);
app.use("/auth", authRoutes);
app.use("/user", users);
app.use("/transaction", transactions);
app.use(errorHandler);

module.exports = app;
