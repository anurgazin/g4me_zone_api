const Account = require("../../db/schemes/accountScheme");
const bcrypt = require("bcryptjs");

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

module.exports = {
  createAccount,
};
