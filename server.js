require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const { db } = require("./db/index");
const articleRouter = require("./routes_controllers/routes/article-route");
const accountRouter = require("./routes_controllers/routes/user-route");
const commentRouter = require("./routes_controllers/routes/comment-route");

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

module.exports = app;
