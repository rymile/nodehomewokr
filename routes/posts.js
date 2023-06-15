const express = require("express");
const router = express.Router();
const Post = require("../schemas/posts.js");
const Comment = require("../schemas/comment.js");

router.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  // [{user, userid}]

  const users = posts.map((post) => {
    return post.commentid;
  });

  const comment = await Comment.find({ commentid: users });
  const results = posts.map((post) => {
    return {
      commentid: post.commentid,
      comment: comment.find((item) => item.commentid === post.commentid),
    };
  });

  res.json({
    posts: results,
  });
});

module.exports = router;
