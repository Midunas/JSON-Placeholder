import {renderAlbums, renderAlbumsByUserId} from "./functions.js";

function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    renderAlbumsByUserId(userId);
  } else {
    renderAlbums();
  }

}
init();
