require("dotenv").config();
const Account = require("../../db/schemes/accountScheme");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

createAccount = (req, res) => {
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
            const account = new Account({
              email: req.body.email,
              password: hash,
            });
            account
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Account successfully created",
                  data: result,
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

loginAccount = (req, res) => {
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
            const token = jsonwebtoken.sign(
              {
                user: user[0],
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "1h",
              }
            );
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

module.exports = {
  createAccount,
  loginAccount,
};
