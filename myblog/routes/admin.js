const express = require("express");
require("dotenv").config();
const router = express.Router();
const adminLayout = "../views/layouts/admin";
const adminnoLayout = "../views/layouts/admin-noLogout";
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const checkLogin = require("../middlewares/checkAdminLogin");

/**
 * Admin Pagee
 * GET /admin
 */
router.get("/admin", (req, res) => {
    res.render("admin/index", { 
        title:"관리자 페이지", 
        layout: adminnoLayout
    });
});

/**
 * Login Administrator
 * POST /admin
 */
router.post("/admin", asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({where: {username: username}});
    if(!user) {
        return res.status(400).send("존재하지 않는 관리자입니다.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }

    const token = jwt.sign( {id: user.id }, jwtSecret);
    res.cookie("token", token, {httpOnly:true});
    res.redirect("/allPosts");
}));

/** 
 * View Register Form
 * GET /register
 */
router.get("/register", asyncHandler(async (req, res) => {
    res.render("admin/index", {
        layout: adminnoLayout
    });
}));

/**
 * Register Administrator
 * POST /register
 */
router.post("/register", asyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword
    })
}));

/**
 * Get all Posts
 * GET /allPosts
 */
router.get("/allPosts", checkLogin, asyncHandler(async (req, res) => {
    const data = await Post.findAll();

    res.render("admin/allPosts", {
        title:"Posts",
        data,
        layout: adminLayout
    });
}));

/**
 * Get Logout
 * GET /logout
 */
router.get("/logout", asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.redirect("/home");
}));

/**
 * Add post
 * GET /add
 */
router.get("/add", checkLogin, asyncHandler(async (req, res) => {
    res.render("admin/add", {
        title: "게시물 작성",
        layout: adminLayout
    });
}));

/**
 * Add post
 * POST /add
 */
router.post("/add", checkLogin, asyncHandler(async (req, res) => {
    const {title,body} = req.body;
    const newPost = new Post({
        title: title,
        body: body
    });
    await Post.create(newPost);
    res.redirect("/allPosts");
}));


/**
 * Edit post
 * GET /edit:id
 */
router.get("/edit/:id", checkLogin, asyncHandler(async (req, res) => {
    const data = await Post.findOne({id:req.params.id});
    res.render("admin/edit", {
        title:"게시물 편집",
        data,
        layout: adminLayout
    });
}));

/**
 * Edit post
 * PUT /edit:id
 */
router.put("/edit/:id", checkLogin, asyncHandler(async(req,res) => {
    const post = await Post.findByPk(req.params.id);

    if(!post) {
        return res.status(404).json({message: "게시글을 찾을 수 없습니다."});
    }
    
    await post.update(req.body);
    res.redirect("/allPosts");
}));


/**
 * Delete post
 * DELETE /
 */
router.delete("/delete/:id", checkLogin, asyncHandler(async(req,res) => {
    const post = await Post.findByPk(req.params.id);
    if(!post) {
        return res.status(404).json({message:"게시글을 찾을 수 없습니다."});
    }
    
    await post.destroy();
    res.redirect("/allPosts");
}));



module.exports = router;