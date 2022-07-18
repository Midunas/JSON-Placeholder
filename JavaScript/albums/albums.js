import headerView from "../header.js";
import { getAlbumsById, getAlbums } from "./albumsController.js";
import { renderAlbums, renderAlbumsByUserId } from "./albumsListView.js";

async function init() {
  let albumsWrapper = document.getElementById("albums-wrapper");
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  headerView();

  if (userId) {
    let albumByIdData = await getAlbumsById(userId);
    renderAlbumsByUserId(albumByIdData);
  } else {
    let albumData = await getAlbums();
    renderAlbums(albumData);
  }
}
init();
