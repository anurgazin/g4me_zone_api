require("dotenv").config();
const Account = require("../../db/schemes/accountScheme");
const bcrypt = require("bcryptjs");
const { authJwt } = require("../../middleware");
const jsonwebtoken = require("jsonwebtoken");

const createAccount = (req, res) => {
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
            console.log(req.body);
            console.log(req.body.password);
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
                console.log(result);
                const { token, refresh_token } = authJwt.generateToken(result);
                res.cookie("refresh_token", refresh_token, { httpOnly: true });
                res.status(201).json({
                  message: "Account successfully created",
                  token: token,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

const loginAccount = (req, res) => {
  Account.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        console.log(req.body);
        return res.status(400).json({
          message: "e-mail is not found",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (!result) {
            console.log(err);
            return res.status(401).json({
              message: "auth failed",
            });
          } else {
            const { token, refresh_token } = authJwt.generateToken(user[0]);
            console.log(user[0]);
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

// const refreshToken = (req, res) => {
//   if (!req.user.id) {
//     return res.status(401).send("Error occurred");
//   }
//   const { token, refresh_token } = authJwt.generateToken(req.user);
//   res.cookie("refresh_token", refresh_token, { httpOnly: true });
//   return res.status(200).json({
//     message: "token refreshed successfully",
//     token: token,
//   });
// };

module.exports = {
  createAccount,
  loginAccount,
  // refreshToken,
};
