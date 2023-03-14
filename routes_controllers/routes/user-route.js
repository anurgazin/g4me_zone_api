const express = require("express");

const AccountController = require("../controllers/user-ctrl");
//const {authJwt} = require("../../middleware")

const router = express.Router();

router.post("/create-account", AccountController.createAccount);

router.post("/login", AccountController.loginAccount);

// router.post("/refresh-token",[authJwt.verifyRefreshToken], AccountController.refreshToken)

module.exports = router;
