import headerView from './header.js';
import { renderComment } from './functions.js';
import { getPostsByUserId } from './posts/postsController.js';
import { renderPostsByUserId } from './posts/postsListView.js';

async function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get("post_id");

  let mainWrapper = document.querySelector("#posts-wrapper");

  headerView();

  function renderPost() {
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then((res) => res.json())
      .then((post) => {

        let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

        let postDiv = document.createElement("div");
        postDiv.classList.add("post-wrap");

        let postTitle = document.createElement("h3");
        postTitle.classList.add("post-title");
        postTitle.textContent = updatedTitle;

        let postParagraph = document.createElement("p");
        postParagraph.classList.add("post-content");
        postParagraph.textContent = post.body;

        let postAuthor = document.createElement("a");

        let otherPosts = document.createElement("a");

        otherPosts.setAttribute("href", `./posts.html?user_id=${post.userId}`);
        otherPosts.innerHTML = `Other posts <br> <br>`;

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
          otherPosts,
          showCommentsButton,
          commentDiv
        );
        mainWrapper.append(postDiv);

        fetch("https://jsonplaceholder.typicode.com/users/" + post.userId)
          .then((res) => res.json())
          .then((user) => {
            postAuthor.innerHTML = `Author: <a href="User.html?user_id=${user.id}">${user.name} <br><br></a>`;
          });

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
          .then((res) => res.json())
          .then((comments) => {
            comments.map((comment) => {
              renderComment(comment, commentDiv);
            });
          });
      });
  }
  renderPost();
}
init();