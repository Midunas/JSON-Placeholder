let mainWrapper = document.querySelector('#wrapper');
let userName = '';
let albumsWrapper = document.querySelector('#user-albums')
// let usersButton = document.querySelector('')

fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
    .then(res => res.json())
    .then(posts => {

        posts.map(post => {


            let paragraph = post.body;

            let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

            let postDiv = document.createElement('div');
            postDiv.classList.add('post-wrap')

            let postTitle = document.createElement('h3');
            postTitle.classList.add('post-title')
            postTitle.textContent = updatedTitle;

            let postParagraph = document.createElement('p');
            postParagraph.classList.add('post-content')
            postParagraph.textContent = paragraph;
            
            let postAuthor = document.createElement('a')
            postAuthor.href = '#';

            let commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-div');
            commentDiv.style.display = 'none';
            let postCommentTitle = document.createElement('h4');
            let postCommentBody = document.createElement('p');
            postCommentBody.classList.add('post-comment');
            let postCommentEmail = document.createElement('p');
            
            let showCommentsButton= document.createElement('button');
            showCommentsButton.classList.add('comments-button');
            showCommentsButton.textContent = `View comments`;

            showCommentsButton.onclick = function () {
                if (commentDiv.style.display == "none") {
                    commentDiv.style.display = "block";
                    showCommentsButton.textContent = `Hide comments`;
                } else {
                  commentDiv.style.display = "none";
                  showCommentsButton.textContent = `View comments`;
                }
            }


            commentDiv.append(postCommentTitle,postCommentBody,postCommentEmail);
            postDiv.append(postTitle,postParagraph,postAuthor,showCommentsButton,commentDiv);
            mainWrapper.append(postDiv);

            fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
                .then(res => res.json())
                .then(user => {

                postAuthor.innerHTML = `Author: <a href="User.html?user_id=${user.id}">${user.name} <br><br></a>`;
                
            })

            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                .then(res => res.json())
                .then(comments => {
                    
                    comments.map(comment => {
                        
                        postCommentTitle.textContent = `Title: ${comment.name}`;
                        postCommentEmail.textContent = `Email: ${comment.email}`;
                        postCommentBody.innerHTML = `<strong>Comment</strong>: <br><br> ${comment.body}`;
                        
                    })
                
            })

        })

    })

    fetch('https://jsonplaceholder.typicode.com/albums?_limit=18')
    .then(res => res.json())
    .then(albums => {
  
      albums.map(album => {
        let albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
  
        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
          .then(res => res.json())
          .then(user => {
  
            fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`)
              .then(res => res.json())
              .then(photos => {
                albumItem.innerHTML = `<h4><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a></h4>
                                       <div>Album created by: ${user.name}</div> <br>
                                       <img src="${photos[0].thumbnailUrl}">`;
              })
          })
  
          albumsWrapper.prepend(albumItem);
      })
  
  
    })


