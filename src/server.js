require("dotenv").config();
const app = require("./app");
const connectDB = require("../config/db");
const colors = require("colors");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.use((req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
      res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
      next();
    });

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`.blue);
      console.log(`Access it at: http://localhost:${port}`.yellow);
    });

    server.setTimeout(45000);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}
startServer();
module.exports = app;
