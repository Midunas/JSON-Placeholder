import { firstLetterUpperCase, getRandomInt, renderPaginationLinks } from "../functions.js";

let albumsWrapper = document.getElementById("albums-wrapper");
let urlParams = document.location.search;
let searchParams = new URLSearchParams(urlParams);
let limit = searchParams.get('limit') ? searchParams.get('limit') : 9;
let page = searchParams.get('page') ? searchParams.get('page') : 1;
renderPaginationLinks({ limit, page }, `./albums.html?`, albumsWrapper, 49);

function renderSingleAlbum(data) {

  let userAlbums = document.querySelector("#user-albums");
  let { album, imageSize } = data;

  let albumItem = document.createElement("div");
  albumItem.classList.add("album-item");

  let photoImage = document.createElement("img");
  photoImage.src = `https://picsum.photos/id/${getRandomInt(27)}/${imageSize}`;

  let photoCount = document.createElement("p");
  photoCount.innerHTML = `(${album.photos.length} Photos)`;

  let userTitle = document.createElement("h4");
  userTitle.innerHTML = `By: <br><br> <a class="title" href="./user.html?user_id=${album.user.id}">${album.user.name}</a>`;
  let albumTitle = document.createElement("h4");
  albumTitle.innerHTML = `<a class="title" href="./album.html?album_id=${album.id
    }&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name
    }">${firstLetterUpperCase(album.title)}</a>`;

  albumItem.append(photoImage, albumTitle, userTitle, photoCount);
  userAlbums.append(albumItem);
  albumsWrapper.append(userAlbums);
}
export { renderSingleAlbum, renderAlbums, renderAlbumsByUserId };

function renderAlbums(albums, size) {
  albums.map((singleAlbum) => {
    renderSingleAlbum({
      album: singleAlbum,
      imageSize: size
    });
  });
}
function renderAlbumsByUserId(albums) {
  let albumData = {
    album: singleAlbum,
    title: `Albums of ${singleAlbum.user.name}:`,
    createdBy: "",
  };
  albums.map((singleAlbum) => {
    renderSingleAlbum(albumData);
  });
}

// function renderPaginationLinks(data) {
//   let total = 100;
//   let currentPage = Number(data.page);
//   let limit = data.limit;
//   let pages = Math.ceil(total / limit);

//   let paginationWrapper = document.createElement('div');
//   paginationWrapper.classList.add('pagination-wrapper');

//   if (currentPage === 1 && limit >= 99) {
//     paginationWrapper.style.display = `none`;
//   }

//   if (currentPage !== 1) {
//     let firstPage = document.createElement('a');
//     firstPage.href = `./albums.html?page=1&limit=${limit}`;
//     firstPage.textContent = `First`;

//     let previousPage = document.createElement('a');
//     previousPage.href = `./albums.html?page=${currentPage - 1}&limit=${limit}`;
//     previousPage.textContent = 'Previous';

//     paginationWrapper.prepend(previousPage, firstPage);
//   }
//   for (let i = 1; i <= pages; i++) {
//     let paginationListItem;

//     if (i === currentPage) {
//       paginationListItem = document.createElement('span');
//       paginationListItem.classList.add('current-page');
//     } else {
//       paginationListItem = document.createElement('a');
//       paginationListItem.href = `./albums.html?page=${i}&limit=${limit}`;
//     }

//     paginationListItem.classList.add('pagination-item');
//     paginationListItem.textContent = i;
//     paginationWrapper.append(paginationListItem);
//   }

//   if (currentPage !== pages) {

//     let nextPage = document.createElement('a');
//     nextPage.href = `./albums.html?page=${currentPage + 1}&limit=${limit}`;
//     nextPage.textContent = 'Next';

//     let lastPage = document.createElement('a');
//     lastPage.href = `./albums.html?page=4&limit=${limit}`;
//     lastPage.textContent = `Last`;

//     paginationWrapper.append(nextPage, lastPage);
//   }


//   albumsWrapper.append(paginationWrapper);
// }