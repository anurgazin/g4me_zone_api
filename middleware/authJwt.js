import jwt from "jsonwebtoken";

import Account from "../db/schemes/accountScheme.js";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      nickname: user.nickname,
      isAdmin: user.isAdmin,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refresh_token = jwt.sign(
    {
      id: user._id,
      nickname: user.nickname,
      isAdmin: user.isAdmin,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return { token, refresh_token };
};

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
    req.user = {
      nickname: decoded.nickname,
      id: decoded.id,
      isAdmin: decoded.isAdmin,
      role: decoded.role,
    };
    next();
  });
};
const isAdmin = (req, res, next) => {
  Account.findById(req.user.id).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user.isAdmin) {
      return res.status(403).send({ message: "Requires admin role" });
    }
    next();
  });
};
const accessToWrite = (req, res, next) => {
  Account.findById(req.user.id).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (user.role !== "Author" && user.role !== "Admin") {
      return res
        .status(403)
        .send({ message: "Requires role of Author or Admin" });
    }
    next();
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  generateToken,
  accessToWrite,
};

export default authJwt;
