import { firstLetterUpperCase, renderComment, renderPaginationLinks } from "../functions.js";

let postWrapper = document.querySelector("#posts-wrapper");
let urlParams = document.location.search;
let searchParams = new URLSearchParams(urlParams);
let page = searchParams.get('page') ? searchParams.get('page') : 1;

function renderPosts(posts, boolean) {

    let limit = searchParams.get('limit') ? searchParams.get('limit') : 25;
    renderPaginationLinks({ limit, page }, './posts.html?', postWrapper, 100);

    posts.map((post) => {

        let showEditButton = boolean;
        let updatedTitleP = firstLetterUpperCase(post.body);


        let updatedTitle = firstLetterUpperCase(post.title);

        let postDiv = document.createElement("div");
        postDiv.classList.add("post-wrap");

        let postTitle = document.createElement("h3");
        postTitle.classList.add("post-title");
        postTitle.textContent = updatedTitle;

        let postParagraph = document.createElement("p");
        postParagraph.classList.add("post-content");
        postParagraph.textContent = updatedTitleP;

        let postAuthor = document.createElement("a");

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-div");
        commentDiv.style.display = "none";

        let showCommentsButton = document.createElement("button");
        showCommentsButton.classList.add("comments-button");
        showCommentsButton.textContent = `View comments`;

        showCommentsButton.onclick = function () {
            if (commentDiv.style.display == "none") {
                commentDiv.style.display = "block";
                showCommentsButton.textContent = `Hide comments`;
            } else {
                commentDiv.style.display = "none";
                showCommentsButton.textContent = `View comments`;
            }
        };
        if (showEditButton) {
            let editPost = document.createElement('a');
            editPost.classList.add('edit-post-button');
            editPost.textContent = 'Edit post';
            editPost.setAttribute('href', `./edit-post.html?post_id=${post.id}`)
            postDiv.append(
                postTitle,
                postParagraph,
                postAuthor,
                editPost,
                showCommentsButton,
                commentDiv
            );

        } else {
            postDiv.append(
                postTitle,
                postParagraph,
                postAuthor,
                showCommentsButton,
                commentDiv
            );
        }
        postWrapper.append(postDiv);
        postAuthor.innerHTML = `Author: <a href="User.html?user_id=${post.user.id}">${post.user.name} <br><br></a>`;


        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then((res) => res.json())
            .then((comments) => {
                comments.map((comment) => {
                    renderComment(comment, commentDiv);
                });
            });

    });

}

function renderPostsByUserId(posts) {


    let limit = searchParams.get('limit') ? searchParams.get('limit') : 2;
    let queryParams = document.location.search;
    let urlParams = new URLSearchParams(queryParams);
    let userId = urlParams.get("user_id");
    renderPaginationLinks({ limit, page }, `./posts.html?user_id=${userId}&`, postWrapper, 10);

    posts.map((post) => {
        let postWrapper = document.querySelector("#posts-wrapper");
        let paragraph = post.body;

        let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

        let postDiv = document.createElement("div");
        postDiv.classList.add("post-wrap");

        let postTitle = document.createElement("h3");
        postTitle.classList.add("post-title");
        postTitle.textContent = updatedTitle;

        let postParagraph = document.createElement("p");
        postParagraph.classList.add("post-content");
        postParagraph.textContent = paragraph;

        let postAuthor = document.createElement("a");

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-div");
        commentDiv.style.display = "none";

        let showCommentsButton = document.createElement("button");
        showCommentsButton.classList.add("comments-button");
        showCommentsButton.textContent = `View comments`;

        showCommentsButton.onclick = function () {
            if (commentDiv.style.display == "none") {
                commentDiv.style.display = "block";
                showCommentsButton.textContent = `Hide comments`;
            } else {
                commentDiv.style.display = "none";
                showCommentsButton.textContent = `View comments`;
            }
        };
        postDiv.append(
            postTitle,
            postParagraph,
            postAuthor,
            showCommentsButton,
            commentDiv
        );
        postWrapper.append(postDiv);

        postAuthor.innerHTML = `<strong> Author: </strong> <a href="User.html?user_id=${post.user.id}"><strong> ${post.user.name} </strong> <br><br></a>`;

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then((res) => res.json())
            .then((comments) => {
                comments.map((comment) => {
                    renderComment(comment, commentDiv);
                });
            });
    });
}
export { renderPosts, renderPostsByUserId };
