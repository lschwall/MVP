require('dotenv').config();
const { PORT } = process.env;
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser');
const app = express();
const { db } = require('../server/db');
const Movie = require('./db')

app.use(express.static('dist'));



app.use(bodyparser.urlencoded({extended: true}))


app.get('/movies', (req, res) => {
    Movie.find()
        //result is the result of the entire query
    .then(result => {
        console.log('MOVIE FOUND!')
        res.status(200).send(result)
    })
    .catch(err => {
        console.log('ERROR IN MOVIE RETRIEVAL', err)
    })
})


app.post('/movies',(req, res) => {
    const testMovie = { 
        id: 1214,
        original_title: 'FAST 7',
        title: 'FAST 7',
        vote_average: 1.3,
        personal_rating: 0.4
    }

    Movie.find(testMovie)
        .then(result => {
            if(!result.length){
                console.log('now saving movie')
                new Movie(testMovie).save()
                    .then((savedMovie) => {
                        res.status(200)
                        res.send(savedMovie)
                        res.send('MOVIE SAVED!')
                        return
                    })
            }else{
                console.log('MOVIE ALREADY ADDED')
                res.status(302)
                res.send('MOVIE ALREADY IN DATABASE, PLEASE SEARCH AGAIN')
            }
        })
        .catch((err) => {
            console.log('ERROR IN SAVING NEW TITLE', err)
        })
})


// NOTHING BELOW THIS LINE

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.listen(PORT, () => {
    console.log(`LISTENING ON ${PORT}`)
})