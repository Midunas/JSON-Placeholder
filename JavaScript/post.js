import headerView from './header.js';
import { renderComment } from './functions.js';

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get("post_id");

headerView();

function renderPost() {
  fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
    .then((res) => res.json())
    .then((post) => {

      let mainWrapper = document.querySelector("#posts-wrapper");

      let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

      let postDiv = document.createElement("div");
      postDiv.classList.add("post-wrap");

      let commentsWrapper = document.createElement('div');
      commentsWrapper.classList.add("comment-div");
      commentsWrapper.style.display = "none";

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

      let showCommentsButton = document.createElement("button");
      showCommentsButton.classList.add("comments-button");
      showCommentsButton.textContent = `View comments`;

      showCommentsButton.onclick = function () {
        if (commentsWrapper.style.display == "none") {
          commentsWrapper.style.display = "block";
          showCommentsButton.textContent = `Hide comments`;
        } else {
          commentsWrapper.style.display = "none";
          showCommentsButton.textContent = `View comments`;
        }
      };

      postDiv.append(
        postTitle,
        postParagraph,
        postAuthor,
        otherPosts,
        showCommentsButton,
        commentsWrapper
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
            renderComment(comment, commentsWrapper);
          });

          let createCommentForm = document.getElementById('comments-form');

          createCommentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            let name = event.target.elements.name.value;
            let email = event.target.elements.email.value;
            let body = event.target.elements.body.value;

            let newComment = {
              name,
              email,
              body,
              postId: Number(postId),
            }

            let editCommentId = event.target.dataset.editCommentId;


            if (!editCommentId) {
              let res = await fetch('https://jsonplaceholder.typicode.com/comments', {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });

              let responseComment = await res.json();
              renderComment(responseComment, commentsWrapper);
            } else {
              let res = await fetch('https://jsonplaceholder.typicode.com/comments/' + editCommentId, {
                method: 'PATCH',
                body: JSON.stringify(newComment),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });

              let responseComment = await res.json();
              renderComment(responseComment, commentsWrapper, editCommentId);
            }

            createCommentForm.reset();
            createCommentForm.elements['edit-button'].value = 'Add a comment';
            delete event.target.dataset.editCommentId;

          });


        });

    });

}
renderPost();
