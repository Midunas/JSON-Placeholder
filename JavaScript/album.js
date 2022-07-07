let userId = '';
let userName ='';
let albumWrapper = document.getElementById('album-wrapper');

fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res => res.json())
    .then(albums => {

        albums.map(album => {

           userId = album.userId;

        fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(res => res.json())
        .then(user => {

             userName = user.name;
             let userNameItem = document.createElement('a');
             userNameItem.href = `http://127.0.0.1:5500/User.html?user_id=${user.id}` 
             userNameItem.textContent = userName;


             let albumTitleList = document.createElement('ul');
             let albumTitle = document.createElement('li');
             albumTitle.innerHTML = album.title;
             albumTitleList.append(albumTitle,userNameItem);
     
     
     
             albumWrapper.append(albumTitleList);

        })

        })


    })

    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
        .then(res => res.json())
        .then(photos => {
            console.log(photos);
        })