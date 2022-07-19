import { firstLetterUpperCase, renderComment } from "../functions.js";
function renderPosts(posts) {
    posts.map((post) => {
        let postWrapper = document.querySelector("#posts-wrapper");
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
        postDiv.append(
            postTitle,
            postParagraph,
            postAuthor,
            showCommentsButton,
            commentDiv
        );
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
function renderPostsByUserId(user) {

    user.posts.map((post) => {
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

        postAuthor.innerHTML = `Author: <a href="User.html?user_id=${user.id}">${user.name} <br><br></a>`;

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