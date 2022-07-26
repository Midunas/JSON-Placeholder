// async function getPosts(limitUrl) {
//     let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user` + limitUrl)
//     let postsData = await res.json();
//     return postsData;
// }
async function getPosts(limitUrl) {
    let urlParams = document.location.search;
    let searchParams = new URLSearchParams(urlParams);
    let limit = searchParams.get('limit') ? searchParams.get('limit') : limitUrl;
    let page = searchParams.get('page') ? searchParams.get('page') : 1;

    console.log(limitUrl);

    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user&_page=${page}&_limit=${limit}`)
    let postsData = await res.json();
    return postsData;
}
async function getPostsByUserId(id) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`);
    let postsDataById = await res.json();
    return postsDataById;
}
export { getPosts, getPostsByUserId };

//   async function getPosts(limitUrl, postWrapper) {
