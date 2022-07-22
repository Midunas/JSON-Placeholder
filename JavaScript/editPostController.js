export async function editPost(post) {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    let createdPost = await res.json();
    return createdPost;
}

// body: JSON.stringify({
//     id,
//     title,
//     body,
//     userId,
// }),