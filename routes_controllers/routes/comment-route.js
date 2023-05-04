import { Router } from "express";

import authJwt from "../../middleware/authJwt.js";
import { getComments } from "../controllers/comment-ctrl.js";
import Comment from "../../db/schemes/commentScheme.js";

const router = Router();
// routes
router.post("/comment", [authJwt.verifyToken], (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a commentary",
    });
  }
  console.log(req.user);
  const comment = new Comment({
    article: body.article,
    text: body.text,
    author: req.user.nickname,
    date: Date.now(),
  });
  if (!comment) {
    console.log("Error in comment assignment");
    return res.status(400).json({ success: false, message: err });
  }

  comment
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "Comment created!",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error,
        message: "Comment is not created!",
      });
    });
});
router.get("/comments/:articleId", getComments);

export default router;
