const express = require("express");

const AccountController = require("../controllers/user-ctrl");
//const Account = require("../../db/schemes/accountScheme");

const router = express.Router();

router.post("/create-account", AccountController.createAccount);

module.exports = router;
