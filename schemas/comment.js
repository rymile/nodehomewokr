const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  commentSpace: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
