import mongoose from "mongoose";
var Schema = mongoose.Schema;
import bluebird from "bluebird";
mongoose.Promise = bluebird;


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
    author:{
      type: String
    },
    approved:{
      type: Boolean,
      default: false
    }
  }
);

export default mongoose.model("articles", Article, "Articles");
