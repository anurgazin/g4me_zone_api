const jwt = require("jsonwebtoken");

const Account = require("../db/schemes/accountScheme");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      nickname: user.nickname,
      isAdmin: user.isAdmin,
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
    console.log("verifytoken: " + decoded.nickname);
    req.user = {
      nickname: decoded.nickname,
      id: decoded.id,
      isAdmin: decoded.isAdmin,
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

// const verifyRefreshToken = (req, res, next) => {
//   const refresh_token = req.cookies.refresh_token;
//   if (!refresh_token) {
//     return res.status(403).send({ message: "Refresh Token is not provided" });
//   }
//   jwt.verify(refresh_token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.log("verifyRefreshToken error: " + err);
//       return res
//         .status(401)
//         .send({ message: "invalid refresh token is provided" });
//     }
//     req.user = {
//       nickname: decoded.nickname,
//       id: decoded.id,
//       isAdmin: decoded.isAdmin,
//     };
//     console.log("verifyRefresh token is called")
//     next();
//   });
// };

const authJwt = {
  verifyToken,
  // verifyRefreshToken,
  isAdmin,
  generateToken,
};

module.exports = authJwt;
