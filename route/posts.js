const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");

router.get("/posts", (req, res) => res.send("hello world"));

router.post("/posts", async (req, res) => {
  const { title, user, password, content, postAt } = req.body;
  const post = await Posts.create({
    title,
    user,
    password,
    content,
    postAt,
  });
  res.status(200).json({ success: post });
});

module.exports = router;
