const Comment = require('../models/comment');

module.exports = (app) => {
    app.post('/movies/:movieid/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body).then((comment) => {
            console.log(comment)
            res.redirect(`/movies/${req.body.movieId}/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}