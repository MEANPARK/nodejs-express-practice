const express = require("express");
const router = express.Router();
const { 
    getLogin, 
    loginMember, 
    getRegister, 
    createMember,
    logout
} = require("../controllers/loginController");

router.route("/")
.get(getLogin)
.post(loginMember);

router.route("/register")
.get(getRegister)
.post(createMember);

router.route("/logout")
.get(logout);

module.exports = router;