// server.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let posts = [];

// Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Add a new post
app.post("/api/posts", (req, res) => {
  const { name, msg } = req.body;
  if (!name || !msg) return res.status(400).json({ error: "Missing name or message" });
  const post = { id: Date.now(), name, msg, comments: [] };
  posts.unshift(post);
  res.json(post);
});

// Add a comment to a post
app.post("/api/posts/:id/comment", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: "Comment text missing" });
  post.comments.push(comment);
  res.json(post);
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
