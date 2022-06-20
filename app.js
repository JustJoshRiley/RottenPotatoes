require('dotenv').config({ path: '.env' });
const assert = require('assert');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const express = require('express')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const path = require('path');
const bodyParser = require('body-parser');
const Review = require('./models/review');





const app = express()
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }));

const reviews = require('./controllers/reviews')(app, Review);

app.use(express.static(path.join(__dirname, '/public')));


const url = process.env.DB_URI || 'mongodb://localhost/rotten';
mongoose.connect(
    url, 
    {
        useNewUrlParser: true,

    },
    function(err, db) {
        assert.equal(null, err);
        console.log('Connected successfully to database');

        // db.close(); turn on for testing
    }
);

const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    helpers: {
        if_eq: function (a, b, opts) {
            // return a === b
            if (a === b) {
                return opts.fn(this);
            }
            return opts.inverse(this);
        },
    },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {title: "New Review"});
})

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review)
        res.redirect(`/reviews/${review._id}`)
    }).catch((err) => {
        console.log(err.message)
    })
})
// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
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
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})
// DELETE
app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

const port = process.env.PORT || 27017;
app.listen(port, () => {
    console.log(`App listening on ${port}!`)
})

module.exports = app;