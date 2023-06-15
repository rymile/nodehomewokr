const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: Number,
  },
  name: {
    type: String,
  },
  commentSpace: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
