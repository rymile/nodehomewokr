const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  commentId: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  commentName: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postsSchema);
