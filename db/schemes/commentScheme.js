import mongoose from "mongoose";
var Schema = mongoose.Schema;
import bluebird from "bluebird";
mongoose.Promise = bluebird;


var Comment = new Schema({
  article: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("comments", Comment, "Comments");
