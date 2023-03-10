const mongoose = require("mongoose");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const config = require("./config/config");
const connectionString = config.connectionString;

mongoose.connect(connectionString);

console.log(config.firebaseConfig.apiKey)

const db = mongoose.connection.on("open", () => {
  console.log("Database connection open.");
});

const firebase_db = initializeApp(config.firebaseConfig);


const storage = getStorage(firebase_db);

module.exports = { db, storage };
