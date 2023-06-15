const express = require("express");
const comment = require("../schemas/comment");
const router = express.Router();

//댓글 조회
router.get("/comment", (req, res) => {
  res.json({ comment: comment });
});

//댓글 상세 조회
router.get("/comment/:commentid", (req, res) => {
  const { commentid } = req.params;
  const { detail } = comment.filter(
    (comment) => comment.commentid === Number(commentid)
  );
  res.json({ detail });
});

const Post = require("../schemas/posts.js");
router.post("/comment/:commentid/posts", async (req, res) => {
  const { commentid } = req.params;
  const { userid } = req.body;

  const existComment = await Post.find({ commentid });
  if (existComment.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 할당된 userid가 존재합니다.",
    });
  }

  await Post.create({ commentid, userid });

  res.json({ result: "success" });
});

router.put("/comment/:commentid/posts", async (req, res) => {
  const { commentid } = req.params;
  const { userid } = req.body;

  const existComment = await Post.find({ commentid });
  if (existComment.length) {
    await Post.updateOne(
      { commentid: commentid },
      { $set: { userid: userid } }
    );
  }
  res.status(200).json({ success: true });
});

router.delete("/comment/:commentid/posts", async (req, res) => {
  const { commentid } = req.params;
  const existComment = await Post.find({ commentid });
  if (existComment.length) {
    await Post.deleteOne({ commentid });
  }

  res.json({ result: "success" });
});

//commentdb에 데이터 추가
const Comment = require("../schemas/comment.js");
router.post("/comment/", async (req, res) => {
  const { commentid, user, password, title, content } = req.body;

  const comment = await Comment.find({ commentid });

  if (comment.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 user입니다." });
  }

  const createdComment = await Comment.create({
    commentid,
    user,
    password,
    title,
    content,
  });
  res.json({ comment: createdComment });
});

module.exports = router;
