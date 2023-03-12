const express = require("express");

const ArticleController = require("../controllers/article-ctrl");
const { authJwt } = require("../../middleware");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("articleImage");

const router = express.Router();
// routes
router.post("/article", [authJwt.verifyToken, authJwt.isAdmin],upload, ArticleController.addArticle)
router.get("/article/:id", ArticleController.getArticleById);
router.get("/articles", ArticleController.getArticles);

module.exports = router;
