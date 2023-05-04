import express from "express";

import { addArticle, approveArticle, deleteArticle, getArticleById, getArticles } from "../controllers/article-ctrl.js";
import authJwt from "../../middleware/authJwt.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("articleImage");

const router = express.Router();
// routes
router.post(
  "/article",
  [authJwt.verifyToken, authJwt.isAdmin],
  upload,
  addArticle
);
router.put(
  "/article/approve/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  approveArticle
);
router.delete(
  "/article/approve/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  deleteArticle
);
router.get("/article/:id", getArticleById);
router.get("/articles", getArticles);

export default router;
