async function getAlbums(limitUrl) {

  let urlParams = document.location.search;
  let searchParams = new URLSearchParams(urlParams);
  let limit = searchParams.get('limit') ? searchParams.get('limit') : limitUrl;
  let page = searchParams.get('page') ? searchParams.get('page') : 1;

  let res = await fetch(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_page=${page}&_limit=${limit}`);
  let albumData = await res.json();
  return albumData;
}

// async function getAlbums(limitUrl) {
//   let res = await fetch(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=${limitUrl}`);
//   let albumData = await res.json();
//   return albumData;
// }

export { getAlbums, getAlbumsById };

async function getAlbumsById(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`);
  let albumByIdData = await res.json();
  return albumByIdData;
}
