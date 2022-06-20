const Review = require('../models/review');

module.exports = function(app) {

    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', {reviews: reviews});
        })
            .catch(err => {
                console.log(err);
            });
    });

}