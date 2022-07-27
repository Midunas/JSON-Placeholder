export function renderListElement(data) {
  let itemElement = document.createElement("li");
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}
export function renderComment(comment, commentsWrapper, editCommentId) {

  let pathname = document.location.pathname;
  let commentItem;

  if (!editCommentId) {
    commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');
    commentItem.dataset.commentId = comment.id;

    commentsWrapper.prepend(commentItem);
  } else {
    commentItem = document.querySelector(`[data-comment-id="${comment.id}"]`);
  }

  commentItem.innerHTML = `<h4> Title: ${firstLetterUpperCase(comment.name)} </h4> 
                              <span> Comment by: ${comment.email} </span>
                              <p> <strong>Comment</strong>: <br><br> ${firstLetterUpperCase(comment.body)} </p>`

  if (pathname.includes("post.html")) {
    let editButton = document.createElement('button');
    editButton.classList.add('edit-post-button')
    editButton.textContent = 'Edit';

    editButton.addEventListener('click', () => {

      let commentForm = document.querySelector('#comments-form');

      let commentTitle = comment.name;
      let commentBody = comment.body;
      let commentEmail = comment.email;

      commentForm.elements.name.value = firstLetterUpperCase(commentTitle);
      commentForm.elements.body.value = firstLetterUpperCase(commentBody);
      commentForm.elements.email.value = firstLetterUpperCase(commentEmail);
      commentForm.elements['edit-button'].value = 'Edit comment';

      commentForm.dataset.editCommentId = comment.id;

      topFunction()

    })

    commentItem.append(editButton);
  } else {

  }
}
export function firstLetterUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export function renderOptionElement(data) {
  let optionElement = document.createElement('option');
  optionElement.textContent = data.content;
  optionElement.value = data.value;

  data.parentElement.append(optionElement);
}
export function getPostUrlParams() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get("post_id");
  return postId;
}
export function getUserIdUrlParams() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");
  return userId;
}
function topFunction() {
  document.documentElement.scrollTop = 0;
}
