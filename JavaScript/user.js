import { firstLetterUpperCase } from './functions.js'
import headerView from './header.js';
let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

let mainWrapper = document.getElementById("wrapper");
let postWrap = document.createElement('div');
postWrap.classList.add('post-wrap');

headerView();

export function renderUser() {
  fetch("https://jsonplaceholder.typicode.com/users/" + userId)
    .then((res) => res.json())
    .then((user) => {

      let userItem = document.createElement("div");
      userItem.classList.add("user-wrap");
      mainWrapper.append(userItem);
      let userImage = document.createElement('img')
      userImage.src = 'https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg';
      userImage.style.height = `175px`;
      let userName = document.createElement("h3");
      userName.classList.add("user-name");
      userName.innerHTML = `${user.name}`;
      let userUsername = document.createElement("p");
      userUsername.innerHTML = `Username: ${user.username}`;

      let userEmail = document.createElement("p");
      userEmail.innerHTML = `Email: <a href="mailto:"${user.email}">${user.email}</a>`;

      let editUser = document.createElement('a');
      editUser.classList.add('edit-post-button');
      editUser.textContent = 'Edit user';
      editUser.setAttribute('href', `./edit-user.html?user_id=${user.id}`)

      let lng = user.address.geo.lng;
      let lat = user.address.geo.lat;
      let addressLink = document.createElement('a')

      addressLink.innerHTML = `Address: ${user.address.street} | ${user.address.suite} | ${user.address.city} | ${user.address.zipcode}`;
      addressLink.href = `http://maps.google.com/maps?z=12&t=m&q=loc:${lng} ${lat}`;
      addressLink.target = `_blank`;

      let userPhone = document.createElement('p');
      userPhone.innerHTML = `Phone: <a href="tel:${user.phone}"> ${user.phone}</a>`;

      let userWeb = document.createElement('p');
      userWeb.innerHTML = `<a href="${user.website}"target="_blank">www.${user.website}</a>`;

      let userCompany = document.createElement('p');
      userCompany.textContent = user.company.name;


      userItem.append(userImage, userName, userUsername, userEmail, addressLink, userPhone, userWeb, userCompany, editUser);

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {

          let postsHeader = document.createElement('h1');
          postsHeader.textContent = ``;
          let postTitle = document.createElement('h3');
          postTitle.textContent = posts.title;

          posts.map(post => {

            let postItem = document.createElement('div');
            postItem.classList.add('post-item');

            postItem.innerHTML = `<h4> ${firstLetterUpperCase(post.title)}</h4>
                              <p>${firstLetterUpperCase(post.body)}</p>
                              <a class="read-more" href="./post.html?post_id=${post.id}">Read More</a>`;

            postItem.append(postTitle);
            postWrap.append(postsHeader, postItem);
            mainWrapper.append(postWrap);
          })
        })

    });
}
renderUser();