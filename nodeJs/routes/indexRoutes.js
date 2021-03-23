const express = require("express");
const router = express.Router();

const jwtHelper = require("../config/jwthelper");

let userCont = require("../controller/userController");

router.post("/register", userCont.register);
router.post("/authenticate", userCont.authenticate);
router.get("/userprofile", jwtHelper.verifyJwtToken, userCont.userprofile);

module.exports = router;
