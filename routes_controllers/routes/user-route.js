import { Router } from "express";

import authJwt from "../../middleware/authJwt.js";
import { createAccount, loginAccount, changeUsername } from "../controllers/user-ctrl.js";

const router = Router();

router.post("/create-account", createAccount);

router.post("/login", loginAccount);

router.put("/username", [authJwt.verifyToken], changeUsername)
// router.post("/refresh-token",[authJwt.verifyRefreshToken], AccountController.refreshToken)

export default router;
