export function renderListElement(data) {
  let itemElement = document.createElement("li");
  itemElement.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentElement.append(itemElement);
}
export function renderComment(comment, commentDiv) {
  let postCommentTitle = document.createElement("h4");
  let postCommentBody = document.createElement("p");
  postCommentBody.classList.add("post-comment");
  let postCommentEmail = document.createElement("p");
  postCommentTitle.textContent = `Title: ${firstLetterUpperCase(comment.name)}`;
  postCommentEmail.innerHTML = `<strong>Email:</strong> ${comment.email}`;
  postCommentBody.innerHTML = `<strong>Comment</strong>: <br><br> ${firstLetterUpperCase(
    comment.body
  )}`;

  commentDiv.append(postCommentTitle, postCommentBody, postCommentEmail);
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