const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

// Get login page
// GET /
const getLogin = (req, res) => {
    res.render("home.ejs");
};

// Login user
// POST /
const loginMember = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const member = await Member.findOne({where: {username}});
    if (!member) {
        return res.status(400).send("존재하지 않는 사용자입니다.");
    }
    
    const isMatch = await bcrypt.compare(password, member.password);
    if(!isMatch) {
        return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }

    const token = jwt.sign( {id: member.id}, jwtSecret); //클라이언트 쿠키에 저장
    res.cookie("token", token, {httpOnly: true}); //http 프로토콜으로만 가능 json -> x
    res.redirect("/contacts");
});

// Get register page
// GET /register
const getRegister = (req, res) => {
    res.render("register");
};

// join member
// POST /register
const createMember = asyncHandler(async (req, res) => {
    const { username, password, password2 } = req.body;
    const exist = await Member.findOne({ where: { username } });
    if (exist) {
        return res.status(400).send("이미 존재하는 사용자입니다.");
    }
    if(password === password2) {
        //success
        const hashedPassword = await bcrypt.hash(password, 10);
        const member = await Member.create({username, password:hashedPassword});
        //res.json({message:"Register successfule", member});
        res.redirect("/");
    } else {
        res.send("Register Failed");
    }
});

// @desc Logout
// @route GET /logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { getLogin, loginMember, getRegister, createMember, logout };