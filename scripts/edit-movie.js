// DOM References
const titleField = $('#movie-title')
const directorField = $('#movie-director')
const yearField = $('#movie-year')
const ratingField = $('#movie-rating')
const posterField = $('#movie-poster')
const posterImage = $('.poster')
const saveButton = $('#save-button')
const messageField = $('#message')

// Set listener to dynamically load poster image
posterField[0].addEventListener('change', event => {
  posterImage[0].src = posterField[0].value || 'images/placeholder.png'
})

let id // track id of currently edited movie

refreshData() // initial page load

function refreshData() {
  // Check for id in address bar (indicating edit mode) 
  id = getMovieAddress()
  if (id) editMode()
  else createMode()
}

function editMode() {
  getMovie(id)
    .then(result => {
      let { title, director, year, star_rating, poster_url } = result.data
      // Fill form fields
      titleField[0].value = title
      directorField[0].value = director
      yearField[0].value = year
      ratingField[0].value = star_rating
      posterField[0].value = poster_url
      posterImage[0].src = poster_url || 'images/placeholder.png'
      // Set save button listener
      saveButton[0].addEventListener('click', updateMovie)
    })
}

function updateMovie() {
  let inputs = getInputs()
  axios.put(`${baseURL}/movies/${id}`, inputs)
    .then(result => displaySuccess())
    .catch(error => displayError(error.response.data.error))
}

function createMode() {
  // Set save button listener
  saveButton[0].addEventListener('click', createMovie)
}

function createMovie() {
  let inputs = getInputs()
  axios.post(`${baseURL}/movies`, inputs)
    .then(result => {
      setMovieAddress(result.data.id)
      displaySuccess()
      // Remove button listener and Refresh page mode
      saveButton[0].removeEventListener('click', createMovie)
      refreshData()
    })
    .catch(error => displayError(error.response.data.error))
}

function getInputs() {
  const inputs = {
    title: titleField[0].value,
    director: directorField[0].value || 'none provided',
    year: yearField[0].value || 0,
    star_rating: ratingField[0].value || 0,
    poster_url: posterField[0].value
  }
  return inputs
}

function displayError(errorMessage) {
  const message = `
    <div class="alert alert-danger fade show" role="alert">
      ${errorMessage}
    </div>
  `
  messageField.html(message)
  setTimeout(function(){ $(".alert").alert('close') }, 2000)
}

function displaySuccess() {
  const message = `
    <div class="alert alert-success fade show" role="alert">
      The movie was saved.
    </div>
  `
  messageField.html(message)
  setTimeout(function(){ $(".alert").alert('close') }, 2000)
}