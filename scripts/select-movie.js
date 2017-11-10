function getMovieAddress() {
  return window.location.hash.replace('#/movie/', '')
}

function getMovie(id) {
  return axios.get(`${baseURL}/movies/${id}`)
}

function setMovieAddress (movieId) {
  window.location.hash = `#/movie/${movieId}`
}