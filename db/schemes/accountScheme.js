import mongoose from "mongoose";
var Schema = mongoose.Schema;
import bluebird from "bluebird";
mongoose.Promise = bluebird;

var Account = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "Guest",
  },
});

export default mongoose.model("accounts", Account, "Accounts");
