const express = require("express");
const app = express();
const port = 3000;
const commentRouter = require("./routes/comment.js");
const postsRouter = require("./routes/posts.js");
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api", commentRouter, postsRouter);
app.get("/", (req, res) => {
  res.send("개인과제 페이지입니다.");
});
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다!");
});
