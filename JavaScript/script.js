import headerView from "./header.js";
import { getUsers } from "./users/usersController.js";
import listUsers from "./users/usersListView.js";
import { getPosts } from "./posts/postsController.js";
import { renderPosts } from './posts/postsListView.js';
import { getAlbums } from './albums/albumsController.js';
import { renderAlbums } from './albums/albumsListView.js';

async function init() {

  let limitUrl = `&_limit=4`;
  headerView();

  let postsData = await getPosts(limitUrl);
  renderPosts(postsData);

  let albumData = await getAlbums(limitUrl);
  renderAlbums(albumData, 200);

  let usersData = await getUsers(limitUrl);
  listUsers(usersData, `100px`, `-home`);
}

init();
