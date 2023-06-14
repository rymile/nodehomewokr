const express = require("express");
const router = express.Router();

const comment = [
  {
    commentId: 1,
    name: "닉네임을 작성합니다.",
    commentSpace: "여기는 내용을 작성하는 곳입니다.",
  },
  {
    commentId: 2,
    name: "ㅇㅇ",
    commentSpace: "과제가 너무 힘들어요",
  },
];

//댓글 목록 조회
router.get("/comment", (req, res) => {
  res.json({ comment });
});

//댓글 상세 조회
const Post = require("../schemas/posts.js");
router.get("/comment/:commentId", (req, res) => {
  const { commentId } = req.params;
  const { detail } = comment.filter(
    (comment) => comment.commentId === Number(commentId)
  );

  res.json({ detail });
});

//댓글 추가
router.post("/comment/:commentId/posts", async (req, res) => {
  const { commentId } = req.params;
  const { quantity } = req.body;

  const existComment = await Post.find({ commentId });
  if (existComment.length) {
    return req.status(400).json({
      suceess: false,
      errorMessage: "먼저 입력된 댓글이 존재합니다.",
    });
  }

  await Post.create({ commentId, quantity });
  res.json({ result: "success" });
});

//댓글 수정
router.put("/comment/:commentId/posts", async (req, res) => {
  const { commentId } = req.params;
  const { quantity } = req.body;

  const existComment = await Post.find({ commentId });
  if (existComment.length) {
    await Post.updateOne(
      { commentId: commentId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ suceess: true });
});

//댓글 삭제
router.delete("/comment/:commentId/posts", async (req, res) => {
  const { commentId } = req.params;

  const existComment = await Post.find({ commentId });
  if (existComment.length) {
    await Post.deleteOne({ commentId });
  }

  res.json({ result: "suceess" });
});

const comments = require("../schemas/comment.js");
const post = require("../schemas/posts.js");
router.post("/comment/", async (req, res) => {
  const { commentId, name, commentSpace } = req.body;

  const comment = await comments.find({ commentId });

  if (comment.length) {
    return res.status(400).json({
      suceess: false,
      errorMessage: "이미 존재하는 commentId입니다.",
    });
  }

  // 댓글 DB 정보
  const createdComment = await comments.create({
    commentId,
    name,
    commentSpace,
  });

  res.json({ comment: createdComment });
});

module.exports = router;
