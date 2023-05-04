import mongoose from "mongoose";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig, connectionString } from "./config/config.js";

mongoose.connect(connectionString);

export const db = mongoose.connection.on("open", () => {
  console.log("Database connection open.");
});

const firebase_db = initializeApp(firebaseConfig);

export const storage = getStorage(firebase_db);

