async function getUsers(limitUrl) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_embed=posts&_limit=` + limitUrl
  );
  let usersData = await res.json();
  return usersData;
}

export { getUsers };
