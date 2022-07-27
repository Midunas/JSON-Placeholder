import headerView from "../header.js";
import { getAlbumsById, getAlbums } from "./albumsController.js";
import { renderAlbums, renderAlbumsByUserId } from "./albumsListView.js";
import { getUserIdUrlParams } from '../functions.js';

async function init() {

  let limitUrl = 100;
  let userId = getUserIdUrlParams();

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
