let postWrapper = document.querySelector("#wrapper");
function init() {
let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get("user_id");

let limitUrl= ``;
let userName = "";

if (userId !== null) {
  renderPostsByUserId(userId);
} else {
  getAllPosts(limitUrl);
}
function renderPostsByUserId(id) {

  fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`)
    .then((res) => res.json())
    .then((user) => {
      user.posts.map((post) => {
        let paragraph = post.body;

        let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

        let postDiv = document.createElement("div");
        postDiv.classList.add("post-wrap");

        let postTitle = document.createElement("h3");
        postTitle.classList.add("post-title");
        postTitle.textContent = updatedTitle;

        let postParagraph = document.createElement("p");
        postParagraph.classList.add("post-content");
        postParagraph.textContent = paragraph;

        let postAuthor = document.createElement("a");

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-div");
        commentDiv.style.display = "none";
        let postCommentTitle = document.createElement("h4");
        let postCommentBody = document.createElement("p");
        postCommentBody.classList.add("post-comment");
        let postCommentEmail = document.createElement("p");

        let showCommentsButton = document.createElement("button");
        showCommentsButton.classList.add("comments-button");
        showCommentsButton.textContent = `View comments`;

        showCommentsButton.onclick = function () {
          if (commentDiv.style.display == "none") {
            commentDiv.style.display = "block";
            showCommentsButton.textContent = `Hide comments`;
          } else {
            commentDiv.style.display = "none";
            showCommentsButton.textContent = `View comments`;
          }
        };

        commentDiv.append(postCommentTitle, postCommentBody, postCommentEmail);
        postDiv.append(
          postTitle,
          postParagraph,
          postAuthor,
          showCommentsButton,
          commentDiv
        );
        postWrapper.append(postDiv);

        postAuthor.innerHTML = `Author: <a href="User.html?user_id=${user.id}">${user.name} <br><br></a>`;

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
          .then((res) => res.json())
          .then((comments) => {
            comments.map((comment) => {
              postCommentTitle.textContent = `Title: ${comment.name}`;
              postCommentEmail.textContent = `Email: ${comment.email}`;
              postCommentBody.innerHTML = `<strong>Comment</strong>: <br><br> ${comment.body}`;
            });
          });
      });
    });
}
}
init()