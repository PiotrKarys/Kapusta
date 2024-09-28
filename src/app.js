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

const mainSwagger = YAML.parse(
  fs.readFileSync(path.join(__dirname, "swagger", "swagger.yaml"), "utf8")
);

const schemas = YAML.parse(
  fs.readFileSync(
    path.join(__dirname, "swagger", "swaggerSchemas.yaml"),
    "utf8"
  )
);

mainSwagger.components = { ...mainSwagger.components, ...schemas.components };

const app = express();

const swaggerDocument = YAML.load(
  path.join(__dirname, "swagger", "swagger.yaml")
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCssUrl: "/api-docs/swagger-ui.css",
    customJs: [
      "/api-docs/swagger-ui-bundle.js",
      "/api-docs/swagger-ui-standalone-preset.js",
    ],
  })
);

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

app.get(
  "/api-docs",
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js",
    ],
  })
);

module.exports = app;
