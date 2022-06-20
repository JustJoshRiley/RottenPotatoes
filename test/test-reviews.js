const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');
const assert = require("assert");
chai.use(chaiHttp);


const sampleReview =     {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

describe('Reviews', ()  => {

  // TEST INDEX
    it('should index ALL reviews on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
            });
    });

    // TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server)
            .get(`/reviews/new`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
            });
    });


    // TEST SHOW
    it('should show a SINGLE review on /reviews/<id> GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    console.log(err)
                    done();
                });
        });
    });
    after(() => {
        Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews, done) => {
            console.log(reviews)
            reviews.remove({}, done);
        })
    });
})

