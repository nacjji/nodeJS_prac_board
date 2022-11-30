const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");

// 전체 게시글 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({});
  res.status(200).json({ success: posts });
});

// 특정 게시글 조회 // 제목으로 찾기
router.get("/find-post", async (req, res) => {
  try {
    const { title } = req.query;
    const post_title = await Posts.findOne(
      { title },
      { password: false, __v: false }
    );
    if (title != post_title.title) throw err;

    res.status(200).json({ success: post_title });
  } catch (err) {
    res.status(400).json({ err: "게시글이 없습니다." });
  }
});

// 게시물 생성
router.post("/posts", async (req, res) => {
  const { title, user, password, content, postAt } = req.body;
  if (!title || !user || !password || !content)
    res.status(400).json({ err: "* 는 필수 항목입니다." });
  const post = await Posts.create({
    title,
    user,
    password,
    content,
    postAt,
  });
  res.status(200).json({ success: post });
});

// 게시물 수정 //params // findOndAndUpdate 를 사용할 수 있다.
router.put("/posts/:_postId", async (req, res) => {
  try {
    const { _postId } = req.params;
    const { title, content } = req.body;
    const post_id = await Posts.findOne({ _id: _postId });

    if (_postId != post_id._id.toString()) throw err;
    await Posts.findOneAndUpdate(
      {
        _id: _postId,
      },
      { title: title, content: content },
      { useFindAndModify: false }
    );
    res.status(200).json({ message: "게시물이 수정되었습니다." });
  } catch (err) {
    res.status(400).json({ err: "게시물이 없습니다." });
  }
});

//게시물 삭제 , id 사용 // findOneAndDelete 사용
router.delete("/posts/:_postId", async (req, res) => {
  try {
    const { _postId } = req.params;
    const { password } = req.body;
    const post = await Posts.findOne({ _id: _postId });

    if (password == post.password)
      await Posts.findOneAndDelete({ _id: _postId });
    else res.status(400).json({ message: "비밀번호가 틀립니다." });
    res.status(200).json({ message: "게시물이 삭제되었습니다." });
  } catch (err) {
    res.status(400).json({ err: "게시물이 없습니다." });
  }
});

module.exports = router;
