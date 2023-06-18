const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const commentsRouter = require("./comment");

const defaultRoutes = [
  {
    path: "/posts",
    route: postsRouter,
  },
  {
    path: "/comment",
    route: commentsRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
