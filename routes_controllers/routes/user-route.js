import { Router } from "express";

import { createAccount, loginAccount } from "../controllers/user-ctrl.js";
//const {authJwt} = require("../../middleware")

const router = Router();

router.post("/create-account", createAccount);

router.post("/login", loginAccount);

// router.post("/refresh-token",[authJwt.verifyRefreshToken], AccountController.refreshToken)

export default router;
