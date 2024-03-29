import { getRandomInt, firstLetterUpperCase } from "./functions.js";
import headerView from "./header.js";

function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let albumId = urlParams.get("album_id");
  let albumTitle = urlParams.get("album_title");
  let userId = urlParams.get("user_id");
  let userName = urlParams.get("user_name");

  headerView();

  renderSwiper();

  function renderSwiper() {
    let albumWrapper = document.querySelector("#album-wrapper");
    let swiperWrapper = document.querySelector(".swiper-wrapper");

    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((res) => res.json())
      .then((photos) => {
        if (photos.length) {
          let albumTitleElement = document.createElement("span");
          albumTitleElement.classList.add("album-title");
          albumTitleElement.innerHTML = `${firstLetterUpperCase(
            albumTitle
          )} <br> <br>`;

          let albumAuthor = document.createElement("span");
          albumAuthor.classList.add("album-author");
          albumAuthor.innerHTML = `<strong>Album author: </strong><a href="./user.html?user_id=${userId}">${userName}</a>`;

          albumWrapper.append(albumTitleElement, albumAuthor);
        } else {
          let textEl = document.createElement("p");
          textEl.innerHTML =
            "No albums were found... <a href='./albums.html'>Try here</a>";

          swiperWrapper.append(textEl);
        }
      });

    fetch("https://picsum.photos/v2/list?page=2&limit=15")
      .then((res) => res.json())
      .then((photos) => {
        photos.map((photo) => {
          let albumPhoto = document.createElement("div");
          albumPhoto.classList.add("swiper-slide");

          let image = document.createElement("img");
          image.setAttribute(
            "src",
            `https://picsum.photos/id/${getRandomInt(27)}/200/300`
          );
          image.setAttribute("alt", photo.title);
          albumPhoto.append(image);
          swiperWrapper.prepend(albumPhoto);
        });
      });
  }
}
init();
