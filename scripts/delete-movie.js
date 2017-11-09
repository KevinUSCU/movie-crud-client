
function deleteMovie(id) {
  return axios.delete(`${baseURL}/movies/${id}`)
}

