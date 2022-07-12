
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

function init () {
  innerPageSearchForm ()
  outsidePageSearchForm()
}

function outsidePageSearchForm() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let searchPhrase = urlParams.get("search-input");
  
    let namesUrl =`title=${searchPhrase}`;
    renderAllNames(namesUrl);

    let postsUrl = `title=${searchPhrase}`;
    renderAllPosts(postsUrl);
  
    let albumsUrl = `title=${searchPhrase}`;
    renderAllAlbums(albumsUrl);
}

function innerPageSearchForm () {

  let searchPageForm = document.querySelector("#search-page-form");

searchPageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  usersList.innerHTML = "";
  postsList.innerHTML = "";
  albumsList.innerHTML = "";

  let searchInput = event.target.elements["search-input"].value;

    let namesUrl = `_like=${searchInput}`;
    renderAllNames(namesUrl);

    let postsUrl = `title_like=${searchInput}`;
    renderAllPosts(postsUrl);

    let albumsUrl = `title_like=${searchInput}`;
    renderAllAlbums(albumsUrl);
});

}

function renderAllNames(searchText) {
  fetch(`https://jsonplaceholder.typicode.com/users?username${searchText}`)
  .then((res) => res.json())
  .then((users) => {
    if (users.length > 0) {
      usersListTitle.textContent = "Users:";

      users.map((user) => {
        let userItem = document.createElement("li");
        userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

        usersList.append(userItem);
      });
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users?name${searchText}`)
        .then((res) => res.json())
        .then((usersByName) => {
          if (usersByName.length > 0) {
            usersListTitle.textContent = "Users:";

            usersByName.map((user) => {
              let userItem = document.createElement("li");
              userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

              usersList.append(userItem);
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
                    let userItem = document.createElement("li");
                    userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

                    usersList.append(userItem);
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
  fetch(`https://jsonplaceholder.typicode.com/posts?${searchText}`)
    .then((res) => res.json())
    .then((posts) => {
      if (posts.length > 0) {

        postsListTitle.textContent = "Posts:";
        posts.map((post) => {
          let postItem = document.createElement("li");
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;
  
          postsList.append(postItem);
        });
      } else {
        postsListTitle.textContent = "Posts not found.";
      }
    });
}

function renderAllAlbums(searchText) {
  fetch(`https://jsonplaceholder.typicode.com/albums?${searchText}`)
  .then((res) => res.json())
  .then((albums) => {
    if (albums.length > 0) {

      renderListElement(albums);
    } else {
      albumsListTitle.textContent = "Albums not found.";
    }
  });


}

function renderListElement(list) {

  albumsListTitle.textContent = "Albums:";

  list.map((album) => {
    let albumItem = document.createElement("li");
    albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}">${album.title}</a>`;

    albumsList.append(albumItem);
  });

}
init();