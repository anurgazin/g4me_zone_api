const jwt = require("jsonwebtoken");

const Account = require("../db/schemes/accountScheme");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Token is not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("verifyToken error: " + err);
      return res.status(401).send({ message: "unauthorized" });
    }
    req.user = decoded.id;
    next();
  });
};
const isAdmin = (req, res, next) => {
  Account.findById(req.user).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user.isAdmin) {
      return res.status(403).send({ message: "Requires admin role" });
    }
    next()
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
