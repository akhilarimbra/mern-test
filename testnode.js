const fetchAlbums = async () => {
  const response = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await response.json()
  console.log(json)
}
fetchAlbums() 