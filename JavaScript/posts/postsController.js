async function getPosts(limitUrl) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user` + limitUrl)
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
