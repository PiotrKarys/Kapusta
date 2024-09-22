require("dotenv").config();
const app = require("./app");
const connectDB = require("../config/db");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    console.log("Connected to the database");

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.setTimeout(45000);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}
startServer();
module.exports = app;
