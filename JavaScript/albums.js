fetch(`https://jsonplaceholder.typicode.com/albums?_limit=30`)
    .then(res => res.json())
    .then(albums => {

        let albumWrapper = document.getElementById('albums-wrapper');

        albums.map(album => {

            let userId = album.userId;
            // (album)

            fetch('https://jsonplaceholder.typicode.com/users/'+ userId)
                .then(res => res.json())
                .then(user => {


                    fetch(`https://jsonplaceholder.typicode.com/albums/${userId}/photos?_limit=1`)
                        .then(res => res.json())
                        .then(photos => {

                             photos.map(photo => {

                                 let albumItem = document.createElement('div');
                                 albumItem.classList.add('album-item')

                                 let photoImage = document.createElement('img');
                                 photoImage.src = photo.thumbnailUrl;

                                 let photoCount = document.createElement('p');
                                 photoCount.innerHTML = `(${photos.length} Photos)`;

                                 let userTitle = document.createElement('h4')
                                 userTitle.innerHTML = `By: <br><br> ${user.name}`;

                                 let albumTitle = document.createElement('h4');
                                 albumTitle.innerHTML = `${album.title}`;

                                albumItem.append(photoImage,albumTitle,userTitle);
                                albumWrapper.append(albumItem);

                             })
                        })


        })

    })
})