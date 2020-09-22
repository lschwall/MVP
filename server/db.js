const mongoose = require('mongoose');
const DATABASE = 'blizzard';

mongoose.connect(`mongodb://localhost/${DATABASE}`, {
    useNewUrlParser:true,
    useUnifiedTopology: true
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
   title: String,
   vote_average: Number,
   personal_rating: Number
})

const Movie = mongoose.model('Movie', newMovie)

module.exports = Movie;