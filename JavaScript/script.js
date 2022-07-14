function init () {

let postsWrapper = document.querySelector("#posts-wrapper");
let userName = "";
let userAlbums = document.querySelector("#user-albums");
let albumWrapper = document.getElementById("albums-wrapper");

// let limitUrl = `&_limit=4`;
// renderPosts(limitUrl);

fetch(`https://jsonplaceholder.typicode.com/posts?_limit=4`)
  .then((res) => res.json())
  .then((posts) => {
    posts.map((post) => {
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
      postAuthor.href = "#";

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
      postsWrapper.append(postDiv);

      fetch("https://jsonplaceholder.typicode.com/users/" + post.userId)
        .then((res) => res.json())
        .then((user) => {
          postAuthor.innerHTML = `Author: <a href="User.html?user_id=${user.id}">${user.name}<br><br></a>`;
        });

      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((res) => res.json())
        .then((comments) => {
          comments.map((comment) => {
            postCommentTitle.textContent = `Title: ${comment.name}`;
            postCommentEmail.innerHTML = `<strong>Email:</strong> ${comment.email}`;
            postCommentBody.innerHTML = `<strong>Comment</strong>: <br><br> ${comment.body}`;
          });
        });
    });
  });

fetch(`https://jsonplaceholder.typicode.com/albums?_limit=4`)
  .then((res) => res.json())
  .then((albums) => {
    albums.map((album) => {
      let userId = album.userId;

      fetch("https://jsonplaceholder.typicode.com/users/" + userId)
        .then((res) => res.json())
        .then((user) => {
          fetch(
            `https://jsonplaceholder.typicode.com/albums/${userId}/photos?_limit=40`
          )
            .then((res) => res.json())
            .then((photos) => {
              console.log(photos);

              let randomIndex = Math.floor(Math.random() * photos.length);

              let albumItem = document.createElement("div");
              albumItem.classList.add("album-item");

              let photoImage = document.createElement("img");
              photoImage.src = photos[randomIndex].thumbnailUrl;

              let photoCount = document.createElement("p");
              photoCount.innerHTML = `(${photos.length} Photos)`;

              let userTitle = document.createElement("h4");
              userTitle.innerHTML = `By: <br><br> <a href="./user.html?user_id=${user.id}">${user.name}</a>`;

              let albumTitle = document.createElement("h4");
              albumTitle.innerHTML = `<a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`;

              albumItem.append(albumTitle, userTitle, photoImage, photoCount);
              userAlbums.append(albumItem);
              albumWrapper.append(userAlbums);
            });
        });
    });
  });

let mainWrapper = document.getElementById("users-wrapper");

function renderUsers() {
  fetch("https://jsonplaceholder.typicode.com/users?_limit=5")
    .then((res) => res.json())
    .then((users) => {
      users.map((user) => {
        let userItem = document.createElement("div");
        userItem.classList.add("user-wrap-home");
        mainWrapper.append(userItem);

        let userImage = document.createElement("img");
        userImage.src =
          "https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg";
        userImage.style.height = `100px`;

        let userName = document.createElement("h3");
        userName.classList.add("user-name");
        userName.innerHTML = `${user.name}`;

        let showDataLink = document.createElement("a");
        showDataLink.href = `./User.html?user_id=${user.id}`;
        showDataLink.target = `_blank`;
        let showDataButton = document.createElement("button");
        showDataButton.classList.add("view-data-button");
        showDataButton.textContent = `View data`;
        showDataLink.append(showDataButton);

        userItem.append(userImage, userName, showDataLink);
      });
    });
}

renderUsers();
}
init();