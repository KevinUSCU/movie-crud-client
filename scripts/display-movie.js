const id = getMovieAddress()
const main = $('main')
displayMovie(id)

function displayMovie(id) {
  getMovie(id)
    .then(result => {
      const { title, director, year, star_rating, poster_url } = result.data
      const star = '⭐️ '
      let movieCard = `
        <br>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-4">
              <div class="card">
                <h2 class="card-header">${title}</h2>
                <div class="card-body">
                  <p class="card-text">Director: ${director}</p>
                  <p class="card-text">Year: ${year}</p>
                  <p class="card-text">Rating: ${star.repeat(star_rating)}</p>
                  <button type="button" class="btn btn-outline-primary btn-sm movie-edit-button">Edit</button>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="card">
                <img class="card-body poster" src=${poster_url || "images/placeholder.png"} alt="Movie poster">
              </div>
            </div>
          </div>
        </div>
      `
      main.html(movieCard)
      movieListen()
    })
}

function movieListen() {
  $('.movie-edit-button')[0].addEventListener('click', event => {
    window.location=`edit-movie.html#/movie/${id}`
  })
}