const express = require("express");

const CommentController = require("../controllers/comment-ctrl");
const Comment = require("../../db/schemes/commentScheme");

const router = express.Router();
// routes
router.post("/comment", (req, res) => {
  //console.log(req.file);
  const body = req.body;
  console.log("I AM HERE / Comment Route(POST /comment)");
  if (!body) {
    console.log("You must provide a comment");
    return res.status(400).json({
      success: false,
      error: "You must provide a comment",
    });
  }
  const comment = new Comment({
    article: body.article,
    text: body.text,
    author: body.author,
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
        id: comment._id,
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
router.get("/comments/:articleId", CommentController.getComments);

module.exports = router;
