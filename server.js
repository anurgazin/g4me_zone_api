import "dotenv/config.js";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";

import {db} from "./db/index.js";
import articleRouter from "./routes_controllers/routes/article-route.js";
import accountRouter from "./routes_controllers/routes/user-route.js";
import commentRouter from "./routes_controllers/routes/comment-route.js";

const app = express();
const apiPort = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello, user!");
});

app.use("/api", articleRouter, commentRouter);
app.use("/account", accountRouter);
// app.use("/comment");

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

export default app;
