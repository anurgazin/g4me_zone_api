var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");

var Article = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    image: {
      default: "",
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true
    },
  }
);

module.exports = mongoose.model("articles", Article, "Articles");
