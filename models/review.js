const mongoose = require('mongoose');

const Review = mongoose.model('Review', new mongoose.Schema( {
    title: String,
    description: String,
    movieTitle: String
},{
    timestamps:true
}
));

module.exports = Review;