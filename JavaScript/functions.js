function renderListElement(data) {
  let itemElement = document.createElement("li");
  // itemElement.classList.add('search-item');
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}

export function getAllPosts(limitUrl, postWrapper) {
  fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user` + limitUrl)
    .then((res) => res.json())
    .then((posts) => {
      posts.map((post) => {
        let paragraph = post.body;
        let updatedTitleP = firstLetterUpperCase(post.body);

        let updatedTitle = firstLetterUpperCase(post.title);

        let postDiv = document.createElement("div");
        postDiv.classList.add("post-wrap");

        let postTitle = document.createElement("h3");
        postTitle.classList.add("post-title");
        postTitle.textContent = updatedTitle;

        let postParagraph = document.createElement("p");
        postParagraph.classList.add("post-content");
        postParagraph.textContent = updatedTitleP;

        let postAuthor = document.createElement("a");

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-div");
        commentDiv.style.display = "none";

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
        postDiv.append(
          postTitle,
          postParagraph,
          postAuthor,
          showCommentsButton,
          commentDiv
        );
        postWrapper.append(postDiv);

        postAuthor.innerHTML = `Author: <a href="User.html?user_id=${post.user.id}">${post.user.name} <br><br></a>`;

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
          .then((res) => res.json())
          .then((comments) => {
            comments.map((comment) => {
              renderComment(comment, commentDiv);
            });
          });
      });
    });
}
function renderComment(comment, commentDiv) {
  let postCommentTitle = document.createElement("h4");
  let postCommentBody = document.createElement("p");
  postCommentBody.classList.add("post-comment");
  let postCommentEmail = document.createElement("p");
  postCommentTitle.textContent = `Title: ${firstLetterUpperCase(comment.name)}`;
  postCommentEmail.innerHTML = `<strong>Email:</strong> ${comment.email}`;
  postCommentBody.innerHTML = `<strong>Comment</strong>: <br><br> ${firstLetterUpperCase(
    comment.body
  )}`;

  commentDiv.append(postCommentTitle, postCommentBody, postCommentEmail);
}

export function renderAllUsers(limitUrl, imageSize, className) {
  fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts` + limitUrl)
    .then((res) => res.json())
    .then((users) => {
      users.map((user) => {
        let mainWrapper = document.getElementById("users-wrapper");
        let userItem = document.createElement("div");
        userItem.classList.add(`user-wrap${className}`);
        mainWrapper.append(userItem);

        let userImage = document.createElement("img");
        userImage.src =
          "https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg";
        userImage.style.height = `${imageSize}`;

        let userName = document.createElement("h3");
        userName.classList.add("user-name");
        userName.innerHTML = `${user.name}`;

        let postsCount = document.createElement("span");
        postsCount.classList.add(`post-count`);
        postsCount.innerHTML = `Posts count: ${user.posts.length} <br><br>`;

        let showDataLink = document.createElement("a");
        showDataLink.href = `./User.html?user_id=${user.id}`;
        showDataLink.target = `_blank`;
        let showDataButton = document.createElement("button");
        showDataButton.classList.add("view-data-button");
        showDataButton.textContent = `View data`;
        showDataLink.append(showDataButton);

        userItem.append(userImage, userName, postsCount, showDataLink);
      });
    });
}

export function firstLetterUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
