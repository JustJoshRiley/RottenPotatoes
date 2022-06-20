// comment.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment