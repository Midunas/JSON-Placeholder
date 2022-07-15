let postWrapper = document.querySelector("#posts-wrapper");

function init () {
let userName = "";
let userAlbums = document.querySelector("#user-albums");
let albumWrapper = document.getElementById("albums-wrapper");

let limitUrl = `&_limit=4`;

getAllPosts(limitUrl);

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

let usersWrapper = document.getElementById("users-wrapper");

function renderUsers() {
  fetch("https://jsonplaceholder.typicode.com/users?_limit=5")
    .then((res) => res.json())
    .then((users) => {
      users.map((user) => {
        let userItem = document.createElement("div");
        userItem.classList.add("user-wrap-home");
        usersWrapper.append(userItem);

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