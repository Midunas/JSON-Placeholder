export async function editUser(user) {
    let res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    let createdPost = await res.json();
    return createdPost;
}