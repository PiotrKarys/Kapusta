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
const YAML = require("yamljs");
const fs = require("fs");

// Wczytaj główny plik swagger.yaml
const mainSwagger = YAML.parse(
  fs.readFileSync("./src/swagger/swagger.yaml", "utf8")
);

// Wczytaj plik ze schematami
const schemas = YAML.parse(
  fs.readFileSync("./src/swagger/swaggerSchemas.yaml", "utf8")
);

// Połącz oba obiekty
mainSwagger.components = { ...mainSwagger.components, ...schemas.components };

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(mainSwagger));

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
