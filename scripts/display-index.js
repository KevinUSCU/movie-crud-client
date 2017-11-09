const table = $('tbody')
displayIndex()
listen()

function displayIndex() {
  table.html('')
  getMovies()
    .then(result => {
      result.data.forEach(movie => table.append(buildItem(movie)))
    })
}

function getMovies() {
  return axios.get(`${baseURL}/movies`)
}

function buildItem(movie) {
  const { id, title, director, year, star_rating } = movie
  let star = '⭐️ '
  let indexRow = `
    <tr id=${id}>
      <td><a href="view-film.html#/movie/${id}">${title}</a></td>
      <td>${director}</td>
      <td>${year}</td>
      <td>${star.repeat(star_rating)}</td>
      <td><button type="button" class="btn btn-outline-primary btn-sm index-delete-button">Delete Movie</button></td>
      <td><button type="button" class="btn btn-outline-primary btn-sm index-edit-button">Edit</button></td>
    </tr>
  `
  return indexRow
}

function listen() {
  table[0].addEventListener('click', event => {
    const clicked = $(event.target)
    if (clicked.hasClass('btn')) {
      // Get ID of movie
      const id = clicked.parent().parent()[0].id
      if (clicked.hasClass('index-delete-button')) deleteMovie(id).then(() => displayIndex())
      else if (clicked.hasClass('index-edit-button')) window.location=`edit-film.html#/movie/${id}`
    }
  })
}