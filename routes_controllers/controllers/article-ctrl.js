const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../../db/index");
const Article = require("../../db/schemes/articleScheme");

const addArticle = async (req, res) => {
  try {
    let img = "";
    if (req.file) {
      img = req.file;
    }
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide an article",
      });
    }

    const timestamp = Date.now();
    const name = img.originalname.split(".")[0];
    const type = img.originalname.split(".")[1];
    const fileName = `${name}_${timestamp}.${type}`;

    const metatype = { contentType: img.mimetype, name: img.originalname };
    const storageRef = ref(storage, `images/${fileName}`);

    const uploadImg = await uploadBytes(storageRef, img.buffer, metatype);
    const img_url = await getDownloadURL(uploadImg.ref);

    const article = new Article({
      title: body.title,
      text: body.text,
      rating: body.rating,
      genre: body.genre,
      release_date: body.release,
      image: img_url,
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
  } catch (error) {
    return res.status(400).json({
      error,
      message: "Article is not created!",
    });
  }
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
  addArticle,
  getArticleById,
  getArticles,
};
