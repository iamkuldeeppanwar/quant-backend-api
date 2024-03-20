const express = require("express");
const router = new express.Router();
const { auth } = require("../controller/auth.controller");
const { signUpUser, loginUser } = require("../controller/auth.controller");
const { getUser } = require("../controller/user.controller");

/*========= user routes ==============*/
router.post("/signup", signUpUser);
router.post("/login", loginUser);

router.get("/users", auth, getUser);

module.exports = router;
