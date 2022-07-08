let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

let albumsWrapper = document.getElementById('albums-wrapper');

if (userId) {

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
    .then(res => res.json())
    .then(albums => {

        albums.map(album => {

            let userId = album.userId;


            fetch('https://jsonplaceholder.typicode.com/users/'+ userId)
                .then(res => res.json())
                .then(user => {


                    fetch(`https://jsonplaceholder.typicode.com/albums/${userId}/photos?_limit=40`)
                        .then(res => res.json())
                        .then(photos => {

                            let randomIndex = Math.floor(Math.random() * photos.length);

                                 let albumItem = document.createElement('div');
                                 albumItem.classList.add('album-item')

                                 let photoImage = document.createElement('img');
                                 photoImage.src = photos[randomIndex].thumbnailUrl;

                                 let photoCount = document.createElement('p');
                                 photoCount.innerHTML = `(${photos.length} Photos)`;

                                 let userTitle = document.createElement('h4')
                                 userTitle.innerHTML = `By: <br><br> <a href="./user.html?user_id=${user.id}">${user.name}</a>`;

                                 let albumTitle = document.createElement('h4');
                                 albumTitle.innerHTML = `<a href="./album.html?album_id=${album.id}&album_title${album.title}&user_id${album.userId}&user_name=${user.name}">${album.title}</a>`;

                                albumItem.append(photoImage,albumTitle,userTitle,photoCount);
                                albumsWrapper.append(albumItem);
                        })


        })

    })
})


} else {

    fetch(`https://jsonplaceholder.typicode.com/albums?_limit=30`)
    .then(res => res.json())
    .then(albums => {

        albums.map(album => {

            let userId = album.userId;


            fetch('https://jsonplaceholder.typicode.com/users/'+ userId)
                .then(res => res.json())
                .then(user => {


                    fetch(`https://jsonplaceholder.typicode.com/albums/${userId}/photos?_limit=40`)
                        .then(res => res.json())
                        .then(photos => {

                            let randomIndex = Math.floor(Math.random() * photos.length);

                                 let albumItem = document.createElement('div');
                                 albumItem.classList.add('album-item')

                                 let photoImage = document.createElement('img');
                                 photoImage.src = photos[randomIndex].thumbnailUrl;

                                 let photoCount = document.createElement('p');
                                 photoCount.innerHTML = `(${photos.length} Photos)`;

                                 let userTitle = document.createElement('h4')
                                 userTitle.innerHTML = `By: <br><br> <a href="./user.html?user_id=${user.id}">${user.name}</a>`;

                                 let albumTitle = document.createElement('h4');
                                 albumTitle.innerHTML = `<a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`;

                                albumItem.append(photoImage,albumTitle,userTitle,photoCount);
                                albumsWrapper.append(albumItem);
                        })


        })

    })
})

}

