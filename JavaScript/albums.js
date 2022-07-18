import { getRandomInt, firstLetterUpperCase } from "./functions.js";
let albumsWrapper = document.getElementById("albums-wrapper");

function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  function renderAlbumsByUserId(id) {
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
function renderAlbums() {
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
  function renderSingleAlbum(data) {
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
    }&album_title${album.title}&user_id${album.userId}&user_name=${
      album.user.name
    }">${firstLetterUpperCase(album.title)}</a>`;

    albumItem.append(photoImage, albumTitle, userTitle, photoCount);
    albumsWrapper.append(albumItem);
  }
  
  if (userId) {
    renderAlbumsByUserId(userId);
  } else {
    renderAlbums();
  }

  function renderSingleAlbum(data) {
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
    }&album_title${album.title}&user_id${album.userId}&user_name=${
      album.user.name
    }">${firstLetterUpperCase(album.title)}</a>`;

    albumItem.append(photoImage, albumTitle, userTitle, photoCount);
    albumsWrapper.append(albumItem);
  }
}
init();
