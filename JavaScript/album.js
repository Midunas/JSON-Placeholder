
let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');
let albumTitle = urlParams.get('album_title');
let userId = urlParams.get('user_id');
let userName = urlParams.get('user_name');

function renderAlbum () {
fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=10`)
    .then(res => res.json())
    .then(photos => {

        let albumWrapper = document.getElementById('album-wrapper');

        if(photos.length > 0) {



        let albumTitleElement = document.createElement('h1');
        albumTitleElement.classList.add('album-title');
        albumTitleElement.textContent = albumTitle;

        let albumAuthorElement = document.createElement('span');
        albumAuthorElement.classList.add(`album-author`);
        albumAuthorElement.innerHTML = `<strong>Album author: </strong> <a href="./User.html?user_id=${userId}"</a> ${userName}<br><br><br>`

        let otherAlbums = document.createElement('span');
        otherAlbums.classList.add('album-author');
        otherAlbums.innerHTML = `<a href="./albums.html?user_id=${userId}"</a>Other albums<br><br><br>`;
        let albumPhotos = document.createElement('div');
        albumPhotos.classList.add('album-photos');

        albumWrapper.append(albumTitleElement,albumAuthorElement,otherAlbums,albumPhotos);

        photos.map(photo => {
            
            let imageElement = document.createElement('img');
            imageElement.classList.add('single-photos')
            imageElement.src = photo.thumbnailUrl;
            imageElement.setAttribute('alt', photo.title);

            albumPhotos.prepend(imageElement);
        })
    } else {
        albumWrapper.innerHTML = `<h1> Nothing to be found :( </h1>`
    }
    })
}
renderAlbum();