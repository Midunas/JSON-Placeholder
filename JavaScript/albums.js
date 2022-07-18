import {renderAlbums, renderAlbumsByUserId} from "./functions.js";
import headerView from './header.js';
function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  headerView();

  if (userId) {
    renderAlbumsByUserId(userId);
  } else {
    renderAlbums();
  }

}
init();
