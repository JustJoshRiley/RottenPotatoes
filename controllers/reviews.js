const Review = require('../models/review');
const Comment = require('../models/comment')
const moment = require('moment');

module.exports = function(app) {

    // app.get('/', (req, res) => {
    //     Review.find()
    //         .then(reviews => {
    //             res.render('reviews-index', {reviews: reviews});
    //     })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });
    // NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', { movieId: req.params.movieId })
    })

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/movies/${review.movieId}`); // Redirect to movies/:id
        }).catch((err) => {
            console.log(err.message);
        })
    })
    // EDIT
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review, title: "Edit Review"});
        })
    })
    // UPDATE
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${review.movieId}/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })
    // DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${review.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
    // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            // res.render('reviews-show', { review: review })
            let createdAt = review.createdAt;
            createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
            review.createdAtFormatted = createdAt;
            Comment.find({ reviewId: req.params.id }).then(comments => {
                comments.reverse();
        // respond with the template with both values
                res.render('reviews-show', { review: review, comments: comments })
            })
        }).catch((err) => {
            console.log(err.message);
        })
    })
}