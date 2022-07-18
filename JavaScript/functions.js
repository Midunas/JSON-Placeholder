export function renderListElement(data) {
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
        let postWrapper = document.querySelector("#posts-wrapper");
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
export function renderComment(comment, commentDiv) {
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

export function firstLetterUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export function renderAlbumsByUserId(id) {
  let albumsWrapper = document.getElementById("albums-wrapper");
  fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`
  )
    .then((res) => res.json())
    .then((albums) => {
      let albumData = {
        album: singleAlbum,
        title: `Albums of ${singleAlbum.user.name}:`,
        createdBy: "",
      };
      albums.map((singleAlbum) => {
        renderSingleAlbum(albumData);
      });
    });
}
export function renderAlbums() {
  let albumsWrapper = document.getElementById("albums-wrapper");
  fetch(
    `https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=30`
  )
    .then((res) => res.json())
    .then((albums) => {
      albums.map((singleAlbum) => {
        renderSingleAlbum({
          album: singleAlbum,
          title: "All albums:",
          createdBy: `<div>Album created by: <a href="./user.html?user_id=${singleAlbum.user.id}">${singleAlbum.user.name}</a></div>`,
        });
      });
    });
}
export function renderSingleAlbum(data) {
  let albumsWrapper = document.getElementById("albums-wrapper");
  let { album, title, createdBy } = data;

  let albumItem = document.createElement("div");
  albumItem.classList.add("album-item");

  let photoImage = document.createElement("img");
  photoImage.src = `https://picsum.photos/id/${getRandomInt(27)}/250`;

  let photoCount = document.createElement("p");
  photoCount.innerHTML = `(${album.photos.length} Photos)`;

  let userTitle = document.createElement("h4");
  userTitle.innerHTML = `By: <br><br> <a class="title" href="./user.html?user_id=${album.user.id}">${album.user.name}</a>`;
  let albumTitle = document.createElement("h4");
  albumTitle.innerHTML = `<a class="title" href="./album.html?album_id=${
    album.id
  }&album_title=${album.title}&user_id=${album.userId}&user_name=${
    album.user.name
  }">${firstLetterUpperCase(album.title)}</a>`;

  albumItem.append(photoImage, albumTitle, userTitle, photoCount);
  albumsWrapper.append(albumItem);
}
