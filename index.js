require('dotenv').config();
const { PORT } = process.env;
const express = require('express')
const bodyparser = require('body-parser');
const app = express()
const { db } = require('./db');
const Movie = require('./db');

app.use(bodyparser.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log(`LISTENING ON ${PORT}`)
})

app.get('/', (req, res) => {
    Movie.find()
    .then(result => {
        console.log('MOVIE FOUND!')
        res.status(200).send(result)
    })
    .catch(err => {
        console.log('ERROR IN MOVIE RETRIEVAL', err)
    })
})

app.post('/',(req, res) => {
    const testMovie = { 
        id: 1212,
        original_title: 'The Santa Clause',
        title: 'The Santa Clause',
        vote_average: 2,
        personal_rating: 2
    }

    Movie.find(testMovie)
        .then(result => {
            if(!result.length){
                console.log('now saving movie')
                new Movie(testMovie).save()
                    .then((savedMovie) => {
                        res.status(200)
                        res.send(savedMovie)
                        return
                    })
            }else{
                console.log('MOVIE ALREADY ADDED')
                res.status(302)
                res.send()
            }
        })
        .catch((err) => {
            console.log('ERROR IN SAVING NEW TITLE', err)
        })
})