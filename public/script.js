async function getPosts() {
  const res = await fetch("/api/posts");
  const data = await res.json();
  renderPosts(data);
}

async function addPost() {
  const name = document.getElementById("username").value.trim();
  const msg = document.getElementById("message").value.trim();

  if (!name || !msg) return alert("Enter your name and message!");

  await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, msg })
  });

  document.getElementById("message").value = "";
  getPosts();
}

async function addComment(id) {
  const commentInput = document.getElementById(`comment-${id}`);
  const text = commentInput.value.trim();
  if (!text) return;

  await fetch(`/api/posts/${id}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment: text })
  });

  getPosts();
}

function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
      <strong>${post.name}</strong><br>
      <p>${post.msg}</p>
      <div class="comments">
        ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
        <div class="comment-form">
          <input id="comment-${post.id}" placeholder="Add a comment...">
          <button onclick="addComment(${post.id})">Comment</button>
        </div>
      </div>
    `;
    container.appendChild(postDiv);
  });
}

getPosts();
