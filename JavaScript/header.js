const navigationItems = [
  {
    title: "Home",
    path: "index.html",
  },
  {
    title: "Users",
    path: "users.html",
  },
  {
    title: "Albums",
    path: "albums.html",
  },
  {
    title: "Posts",
    path: "posts.html",
  },
];

let pathname = document.location.pathname;

let header = document.createElement("div");
header.classList.add("header");

let logo = document.createElement("img");
logo.src = "./images/lgorandom.JPG";
logo.classList.add("logo-image");

let navList = document.createElement("ul");
navList.classList.add("list-flex");

navigationItems.map((navItem) => {
  let navItemElement = document.createElement("li");
  let navItemLink = document.createElement("a");
  navItemLink.textContent = navItem.title;
  navItemLink.setAttribute("href", `./${navItem.path}`);

  if (pathname.includes(navItem.path)) {
    navItemLink.classList.add("active");
  }

  navItemElement.append(navItemLink);
  navList.append(navItemElement);
});

header.append(logo, navList);

if (!pathname.includes("search.html")) {
  let searchForm = document.createElement("form");
  searchForm.action = `./search.html`;
  let searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("name", "search-input");
  searchInput.setAttribute("id", "search");

  let searchSubmit = document.createElement("button");
  searchSubmit.textContent = `Search`;
  searchSubmit.setAttribute("type", "submit");
  searchSubmit.setAttribute("id", "search-button");

  searchForm.append(searchSubmit, searchInput);
  navList.append(searchForm);
}

document.body.prepend(header);
