const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

router.get(["/", "/home"], asyncHandler(async (req, res) => {
    const data = await Post.findAll();

    res.render("index", { 
        title: "Home",
        data,
        layout: mainLayout}
    );
}));

router.get("/about", asyncHandler(async(req, res) => {
    res.render("about", {
        title: "About", 
        layout: mainLayout});
}));

router.get("/post/:id", asyncHandler(async(req, res) => {
    const data = await Post.findOne({where: { id: req.params.id}});
    res.render("post", {
        data,
        layout: mainLayout
    });
}))

module.exports = router;
