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

export function renderPaginationLinks(data, pageName, pageWrapper) {

  let total = 100;
  let currentPage = Number(data.page);
  let limit = data.limit;
  let pages = Math.ceil(total / limit);

  if (pages === 1) {
    return;
  }
  let paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination-wrapper');

  if (currentPage !== 1) {
    let firstPage = document.createElement('a');
    firstPage.href = `./${pageName}.html?page=1&limit=${limit}`;
    firstPage.textContent = `First`;

    let previousPage = document.createElement('a');
    previousPage.href = `./${pageName}.html?page=${currentPage - 1}&limit=${limit}`;
    previousPage.textContent = 'Previous';

    paginationWrapper.prepend(previousPage, firstPage);
  }
  for (let i = 1; i <= pages; i++) {
    let paginationListItem;

    if (i === currentPage) {
      paginationListItem = document.createElement('span');
      paginationListItem.classList.add('current-page');
    } else {
      paginationListItem = document.createElement('a');
      paginationListItem.href = `./${pageName}.html?page=${i}&limit=${limit}`;
    }

    paginationListItem.classList.add('pagination-item');
    paginationListItem.textContent = i;
    paginationWrapper.append(paginationListItem);
  }

  if (currentPage !== pages) {

    let nextPage = document.createElement('a');
    nextPage.href = `./${pageName}.html?page=${currentPage + 1}&limit=${limit}`;
    nextPage.textContent = 'Next';

    let lastPage = document.createElement('a');
    lastPage.href = `./${pageName}.html?page=4&limit=${limit}`;
    lastPage.textContent = `Last`;

    paginationWrapper.append(nextPage, lastPage);
  }


  pageWrapper.append(paginationWrapper);
}