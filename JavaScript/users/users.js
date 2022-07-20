import { getUsers } from "./usersController.js";
import headerView from "../header.js";
import listUsers from "./usersListView.js";

let limitUrl = ``;

async function init() {
  headerView();

  let usersData = await getUsers(limitUrl);
  listUsers(usersData, `175px`, ``);
}
init();
