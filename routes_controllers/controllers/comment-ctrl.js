const Comment = require("../../db/schemes/commentScheme");

getComments = async (req, res) => {
  await Comment.find({ article: req.params.articleId })
    .then((comments) => {
      if (!comments.length) {
        return res.status(201).json({ success: false, data: 1 });
      }
      return res.status(200).json({ success: true, data: comments });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  getComments,
};
