const express = require("express");

const ArticleController = require("../controllers/article-ctrl");

const router = express.Router();
// routes
router.post("/article", ArticleController.createArticle);
router.get("/article/:id", ArticleController.getArticleById);
router.get("/articles", ArticleController.getArticles);

module.exports = router;
