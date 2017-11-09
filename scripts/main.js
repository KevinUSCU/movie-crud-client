// Following line is to connect to deployed Heroku server
// const baseURL = 'https://kevinuscu-movie-crud-server.herokuapp.com'
// Following line is to connect to locally hosted server
const baseURL = 'http://localhost:3000'

// Navbar Listeners
$('#nav-index-button')[0].addEventListener('click', event => window.location="film-index.html")
$('#nav-add-button')[0].addEventListener('click', event => window.location="add-film.html")