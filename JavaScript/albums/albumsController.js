async function getAlbums() {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=30`
  );
  let albumData = await res.json();
  return albumData;
}
export { getAlbums, getAlbumsById };

async function getAlbumsById(id) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`
  );
  let albumByIdData = await res.json();
  return albumByIdData;
}
