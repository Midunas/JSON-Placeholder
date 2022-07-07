let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

console.log(userId);

let mainWrapper = document.getElementById("wrapper");
let postWrap = document.createElement('div');
postWrap.classList.add('post-wrap');


fetch("https://jsonplaceholder.typicode.com/users/"+ userId)
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
    userEmail.innerHTML = `Email:<a href="mailto:"${user.email}">${user.email}</a>`;

    let lng = user.address.geo.lng;
    let lat = user.address.geo.lat;
    let addressLink = document.createElement('a')

    addressLink.innerHTML = `Address: ${user.address.street} | ${user.address.suite} | ${user.address.city} | ${user.address.zipcode}`;
    addressLink.href =`http://maps.google.com/maps?z=12&t=m&q=loc:${lng} ${lat}`;
    addressLink.target = `_blank`;

    let userPhone = document.createElement('p');
    userPhone.innerHTML = `Phone: <a href="tel:${user.phone}"> ${user.phone}</a>`;

    let userWeb = document.createElement('p');
    userWeb.innerHTML = `<a href="${user.website}"target="_blank">www.${user.website}</a>`;
        
    let userCompany = document.createElement('p');
    userCompany.textContent = user.company.name;
    

    userItem.append(userImage, userName, userUsername, userEmail, addressLink, userPhone, userWeb,userCompany);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(res => res.json())
    .then(posts => {

      let postsHeader = document.createElement('h1');
      postsHeader.textContent= `Posts`;
      let postTitle = document.createElement('h3');
      postTitle.textContent = posts.title;
      
      posts.map(post => {
       
        let postItem = document.createElement('div');
        postItem.classList.add('post-item');

        postItem.innerHTML = `<h4> ${post.title}</h4>
                              <p>${post.body}</p>
                              <a class="read-more" href="./post.html?post_id=${post.id}">Read More</a>`;

        postItem.append(postTitle);
        postWrap.append(postsHeader,postItem);
        mainWrapper.append(postWrap);
      })
    })

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .then(albums => {
        let userAlbums = document.querySelector('#user-albums');

        userAlbums.innerHTML = `<h3 class="user-albums-title">User albums:</h3>`;

        let albumsList = document.createElement('ul');
        albumsList.classList.add('albums-list');

        userAlbums.append(albumsList);

        albums.map(album => {
          let albumItem = document.createElement('li');
          albumItem.classList.add(`album-item`);

          albumItem.innerHTML = `<a class="read-more" href="./album.html">${album.title}</a>`;

          albumsList.prepend(albumItem);
        })
      })


      });