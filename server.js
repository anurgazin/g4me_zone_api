const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db/index");
const articleRouter = require("./routes_controllers/routes/article-route");

const app = express();
const apiPort = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('upload'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello, user!");
});

app.use("/api", articleRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
