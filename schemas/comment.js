const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentid: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
