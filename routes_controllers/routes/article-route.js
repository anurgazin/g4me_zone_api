const express = require("express");

const ArticleController = require("../controllers/article-ctrl");
var path = require("path");
const Article = require("../../db/schemes/articleScheme");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "upload/",
  filename: function (req, file, cb) {
    console.log("Uploading Photo");
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
// routes
router.post("/article", upload.single("articleImage"), (req, res) => {
  let img = "";
  if (req.file) {
    img = req.file.path.replace("upload/", "");
  }
  const body = req.body;
  console.log("I AM HERE");
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an article",
    });
  }
  const article = new Article({
    title: body.title,
    text: body.text,
    rating: body.rating,
    image: img,
    date: Date.now(),
  });
  if (!article) {
    return res.status(400).json({ success: false, error: err });
  }

  article
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: article._id,
        message: "Article created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Article is not created!",
      });
    });
});
router.get("/article/:id", ArticleController.getArticleById);
router.get("/articles", ArticleController.getArticles);

module.exports = router;
