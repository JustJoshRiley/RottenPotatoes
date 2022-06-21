require('dotenv').config({ path: '.env' });
const {MovieDb} = require('moviedb-promise')
const moviedb = new MovieDb(process.env.API_KEY)
const Review = require('../models/review');

module.exports = function(app) {
    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })
    // app.get('/movies/:id', (req, res) => {
    //     moviedb.movieInfo({ id: req.params.id }).then(movie => {
    //         res.render('movies-show', { movie: movie });
    //     }).catch(console.error)
    // })
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            // moviedb.movieTrailers({ id: req.params.id }).then(videos => {
                // movie.trailer_youtube_id = videos.youtube[0].source;
                // console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);
                // FIND THIS MOVIE'S REVIEWS
                Review.find({ movieId: req.params.id }).then(reviews => {
                    // THEN RENDER THE MOVIES-SHOW TEMPLATE
                    res.render('movies-show', { movie: movie, reviews: reviews });
                }).catch(console.error);
            // }).catch(console.error);
        }).catch(console.error);
    })
}