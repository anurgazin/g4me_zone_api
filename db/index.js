const mongoose = require("mongoose");
const config = require("./config/config");
const connectionString = config.database_connection_string;

mongoose.connect(connectionString);

const db = mongoose.connection.on("open", () => {
  console.log("Database connection open.");
});

module.exports = db;
