import headerView from "../header.js";
import { getAlbumsById, getAlbums } from "./albumsController.js";
import { renderAlbums, renderAlbumsByUserId } from "./albumsListView.js";

async function init() {
  let limitUrl = `&_limit=30`;
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  headerView();

  if (userId) {
    let albumByIdData = await getAlbumsById(userId);
    renderAlbumsByUserId(albumByIdData);
  } else {
    let albumData = await getAlbums(limitUrl);
    renderAlbums(albumData, 250);
  }
}
init();
