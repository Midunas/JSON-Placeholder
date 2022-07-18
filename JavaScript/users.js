import {renderAllUsers} from './functions.js';
import headerView from './header.js';

let limitUrl = ``;

headerView();

renderAllUsers(limitUrl, `175px`, ``);
