import "dotenv/config.js";
import Account from "../../db/schemes/accountScheme.js";
import Comment from "../../db/schemes/commentScheme.js";
import Article from "../../db/schemes/articleScheme.js";
import bcrypt from "bcryptjs";
import authJwt from "../../middleware/authJwt.js";

export const createAccount = (req, res) => {
  Account.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "E-mail is occupied",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            if (!req.body.nickname) {
              req.body.nickname = req.body.email.split("@")[0];
            }
            const account = new Account({
              email: req.body.email,
              nickname: req.body.nickname,
              password: hash,
            });
            account
              .save()
              .then((result) => {
                const { token, refresh_token } = authJwt.generateToken(result);
                res.cookie("refresh_token", refresh_token, { httpOnly: true });
                res.status(201).json({
                  message: "Account successfully created",
                  token: token,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

export const loginAccount = (req, res) => {
  Account.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(400).json({
          message: "e-mail is not found",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (!result) {
            return res.status(401).json({
              message: "auth failed",
            });
          } else {
            const { token, refresh_token } = authJwt.generateToken(user[0]);
            res.cookie("refresh_token", refresh_token, { httpOnly: true });
            return res.status(200).json({
              message: "auth completed",
              token: token,
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeUsername = (req, res) => {
  Account.find({ nickname: req.body.username })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({ message: "Username is occupied" });
      } else {
        Article.updateMany(
          { author: req.user.nickname },
          { $set: { author: req.body.username } }
        )
          .then((result) => {
            if (result.acknowledged === false) {
              console.log("Something went wrong!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        Comment.updateMany(
          { author: req.user.nickname },
          { $set: { author: req.body.username } }
        )
          .then((result) => {
            if (result.acknowledged === false) {
              console.log("Something went wrong!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        Account.updateOne(
          { _id: req.user.id },
          { $set: { nickname: req.body.username } }
        )
          .then((result) => {
            if (result.acknowledged === false) {
              return res.status(406).json({
                message: error,
              });
            }
            return res.status(200).json({
              message: "Username is changed",
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(408).json({
              message: error,
            });
          });
      }
    });
};
