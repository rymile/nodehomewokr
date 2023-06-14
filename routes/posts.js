const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");
const Comment = require("../schemas/posts.js");

router.get("/post", async (req, res) => {
  const posts = await Post.find({});

  const commentId = posts.map((post) => {
    return post.commentId;
  });

  const comment = await Comment.find({ commentId: commentId });

  const result = posts.map((post) => {
    return {
      quantity: post.quantity,
      comment: comment.find((item) => item.commentId === post.commentId),
    };
  });

  res.json({
    comment: result,
  });
});

module.exports = router;
