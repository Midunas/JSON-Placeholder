import { getUserById } from "../createPost/createPostController.js";
import { firstLetterUpperCase } from "../functions.js";

export default async function editNewPost(createdPost, formElement) {
    let { body, title, id, userId } = createdPost;

    let createdPostWrapper = document.createElement('div');
    createdPostWrapper.classList.add('post-wrapper');

    let postTitleElement = document.createElement('h2');
    postTitleElement.innerHTML = `${firstLetterUpperCase(title)} <span>(id: ${id})</span>`;

    let postAuthor = await getUserById(userId);

    let postAuthorElement = document.createElement('span');
    postAuthorElement.innerHTML = `Post author: <a href="./user.html?user_id=${userId}">${postAuthor.name}</a>`

    let postContentElement = document.createElement('p');
    postContentElement.textContent = firstLetterUpperCase(body);

    createdPostWrapper.append(postTitleElement, postAuthorElement, postContentElement);

    formElement.after(createdPostWrapper);
}