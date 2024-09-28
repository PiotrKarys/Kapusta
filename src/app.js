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
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./swagger/swagger.json");

const app = express();
const swaggerFilePath = path.join(__dirname, "swagger", "swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
cleanupBlacklist();
app.use(logger(formatsLogger));
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(cors({ origin: "https://localhost:3000" }));
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
