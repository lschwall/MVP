const mongoose = require('mongoose');
const DATABASE = 'drawer';

mongoose.connect(`mongodb://localhost/${DATABASE}`, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    createIndexes: true
})
    .then(() => {
        console.log('CONNECTED TO DATABASE')
    })
    .catch(() => {
        console.log('ERROR CONNECTING DATABASE')
    })

const newMovie = new mongoose.Schema({
   id: Number, 
   original_title: String, 
   title: {type: String, unique: true},
   vote_average: Number,
   poster_path: String,
   overview: String,
   personal_rating: Number
})

const Movie = mongoose.model('Movie', newMovie)

module.exports = Movie;