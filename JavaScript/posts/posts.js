import headerView from '../header.js';
import { renderPosts, renderPostsByUserId } from './postsListView.js';
import { getPosts, getPostsByUserId } from './postsController.js';

async function init() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");
  headerView();

  let limitUrl = 25;

  if (userId !== null) {
    let postsDataById = await getPostsByUserId(userId);
    renderPostsByUserId(postsDataById);
  } else {
    let postsData = await getPosts(limitUrl);
    renderPosts(postsData, true);
  }
}
init()

// funkcija funkcijoje su if ir else 