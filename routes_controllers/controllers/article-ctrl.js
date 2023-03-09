const Article = require("../../db/schemes/articleScheme");

getArticleById = async (req, res) => {
  await Article.findOne({ _id: req.params.id })
    .then((art) => {
      if (!art) {
        return res
          .status(404)
          .json({ success: false, error: `Article is not found` });
      }
      return res.status(200).json({ success: true, data: art });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

getArticles = async (req, res) => {
  await Article.find({})
    .then((articles) => {
      if (!articles.length) {
        return res
          .status(404)
          .json({ success: false, error: `No Articles found` });
      }
      return res.status(200).json({ success: true, data: articles });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  getArticleById,
  getArticles,
};
