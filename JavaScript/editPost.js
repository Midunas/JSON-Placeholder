import headerView from './header.js';
import { getAllUsers } from './createPost/createPostController.js';
import { editPost } from './editPostController.js';
import { renderOptionElement, firstLetterUpperCase } from './functions.js';
import createPost from './createPost/createPostView.js';

async function init() {
    headerView();
    let queryParams = document.location.search;
    let urlParams = new URLSearchParams(queryParams);
    let postId = urlParams.get("post_id");

    fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
        .then(res => res.json())
        .then(posts => {

            let postTitle = document.getElementById('post-title');
            postTitle.value = firstLetterUpperCase(posts.title);

            let postContent = document.getElementById('post-content');
            postContent.textContent = firstLetterUpperCase(posts.body);

        })

    let users = await getAllUsers();

    let selectElement = document.querySelector('#post-author');

    users.map(item => {
        renderOptionElement({
            content: item.name,
            value: item.id,
            parentElement: selectElement,
        });
    })
    let editPostForm = document.querySelector('#edit-post-form');

    editPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let newPostTitle = event.target.elements.title.value;
        let newPostContent = event.target.elements.content.value;
        let newPostAuthor = event.target.elements.author.value;


        let newPost = {

            title: newPostTitle,
            body: newPostContent,
            userId: newPostAuthor,
        };

        let editedPost = await editPost(newPost);

        createPost(editedPost, event.target);

        event.target.reset();
    })

}

init();