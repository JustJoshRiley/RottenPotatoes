const mongoose = require('mongoose');

const Review = mongoose.model('Review', new mongoose.Schema( {
    title: String,
    description: String,
    movieTitle: String,
    movieId: { type: String, required: true }
},{
    timestamps:true
}
));

module.exports = Review;