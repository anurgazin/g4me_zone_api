const Article = require("../../db/schemes/articleScheme");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function (req, file, cb) {
    console.log("Uploading Photo");
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

createArticle = upload.single("articleImage"),
  (req, res) => {
    //console.log(req.file);
    const body = req.body;
    console.log("I AM HERE");
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide an article",
      });
    }
    const article = new Article(body);
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
  };

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
  createArticle,
  getArticleById,
  getArticles,
};
