let mainWrapper = document.querySelector('#wrapper');
let userName = '';

fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
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

            // Komentarų divas ir draugai

            let commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-div');
            commentDiv.style.display = 'none';
            let postCommentTitle = document.createElement('h4');
            let postCommentBody = document.createElement('p');
            postCommentBody.classList.add('post-comment');
            let postCommentEmail = document.createElement('p');
            
            let showCommentsButton= document.createElement('button');
            showCommentsButton.textContent = `Show comments`;

            showCommentsButton.onclick = function () {
                if (commentDiv.style.display == "none") {
                    commentDiv.style.display = "block";
                    showCommentsButton.textContent = `Hide comments`;
                } else {
                  commentDiv.style.display = "none";
                  showCommentsButton.textContent = `Show comments`;
                }
            }

            // Viską appendinu

            commentDiv.append(postCommentTitle,postCommentBody,postCommentEmail);
            postDiv.append(postTitle,postParagraph,postAuthor,showCommentsButton,commentDiv);
            mainWrapper.append(postDiv);

            fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
                .then(res => res.json())
                .then(user => {
                postAuthor.innerHTML = `Author: ${user.name} <br><br>`;
                
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
