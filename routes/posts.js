const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");
const Comment = require("../schemas/comment.js");

router.get("/posts", async (req, res) => {
  const posts = await Post.find({});

  const commentIds = posts.map((post) => {
    return post.commentId;
  });

  const comment = await Comment.find({ commentId: commentIds });

  const result = posts.map((post) => {
    return {
      quantity: post.quantity,
      comment: comment.find((item) => item.commentId === post.commentId),
    };
  });

  res.json({
    comments: result,
  });
});

module.exports = router;
