import { firstLetterUpperCase, renderListElement } from './functions.js';
import headerView from './header.js';

let searchResults = document.querySelector("#search-results-form");
let usersList = document.createElement("ul");
usersList.classList.add("search-result");

let usersListTitle = document.createElement("h3");

let postsList = document.createElement("ul");
let postsListTitle = document.createElement("h3");

let albumsList = document.createElement("ul");
let albumsListTitle = document.createElement("h3");

searchResults.append(usersList, postsList, albumsList);
usersList.before(usersListTitle);
postsList.before(postsListTitle);
albumsList.before(albumsListTitle);

function init() {
  headerView();
  innerPageSearchForm();
  outsidePageSearchForm();
}

function outsidePageSearchForm() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let searchPhrase = urlParams.get("search-input");

  let namesUrl = `=${searchPhrase}`;
  renderAllUsers(namesUrl);

  let postsUrl = `title=${searchPhrase}`;
  renderAllPosts(postsUrl);

  let albumsUrl = `title=${searchPhrase}`;
  renderAllAlbums(albumsUrl);
}

function innerPageSearchForm() {
  let searchPageForm = document.querySelector("#search-page-form");

  searchPageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let searchInput = event.target.elements["search-input"].value;

    let namesUrl = `_like=${searchInput}`;
    renderAllUsers(namesUrl);

    let postsUrl = `title_like=${searchInput}`;
    renderAllPosts(postsUrl);

    let albumsUrl = `title_like=${searchInput}`;
    renderAllAlbums(albumsUrl);
  });
}

function renderAllUsers(searchText) {
  usersList.innerHTML = "";
  fetch(`https://jsonplaceholder.typicode.com/users?username${searchText}`)
    .then((res) => res.json())
    .then((users) => {
      if (users.length > 0) {
        usersListTitle.textContent = "Users:";

        users.map((user) => {
          renderListElement({
            content: user.name,
            href: `./User.html?user_id=${user.id}`,
            parentElement: usersList,
          });
        });
      } else {
        fetch(`https://jsonplaceholder.typicode.com/users?name${searchText}`)
          .then((res) => res.json())
          .then((usersByName) => {
            if (usersByName.length > 0) {
              usersListTitle.textContent = "Users:";

              usersByName.map((user) => {
                renderListElement({
                  content: user.name,
                  href: `./User.html?user_id=${user.id}`,
                  parentElement: usersList,
                });
              });
            } else {
              fetch(
                `https://jsonplaceholder.typicode.com/users?email${searchText}`
              )
                .then((res) => res.json())
                .then((usersByEmail) => {
                  if (usersByEmail.length > 0) {
                    usersListTitle.textContent = "Users:";

                    usersByEmail.map((user) => {
                      renderListElement({
                        content: user.name,
                        href: `./User.html?user_id=${user.id}`,
                        parentElement: usersList,
                      });
                    });
                  } else {
                    usersListTitle.textContent = "Users not found.";
                  }
                });
            }
          });
      }
    });
}

function renderAllPosts(searchText) {
  postsList.innerHTML = "";
  fetch(`https://jsonplaceholder.typicode.com/posts?${searchText}`)
    .then((res) => res.json())
    .then((posts) => {
      if (posts.length > 0) {
        postsListTitle.textContent = "Posts:";
        posts.map((post) => {
          let postData = {
            content: firstLetterUpperCase(post.title),
            href: `./post.html?post_id=${post.id}`,
            parentElement: postsList,
          };
          renderListElement(postData);
        });
      } else {
        postsListTitle.textContent = "Posts not found.";
      }
    });
}

function renderAllAlbums(searchText) {
  albumsList.innerHTML = "";
  fetch(`https://jsonplaceholder.typicode.com/albums?${searchText}`)
    .then((res) => res.json())
    .then((albums) => {
      albumsListTitle.textContent = "Albums:";

      if (albums.length > 0) {
        albums.map((album) => {
          let albumData = {
            content: firstLetterUpperCase(album.title),
            href: `./album.html?album_id=${album.id}`,
            parentElement: albumsList,
          };
          renderListElement(albumData);
        });
      } else {
        albumsListTitle.textContent = "Albums not found.";
      }
    });
}
init();
