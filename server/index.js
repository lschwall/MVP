require('dotenv').config();
const { PORT } = process.env;
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser');
const app = express();
const { db } = require('../server/db');
const Movie = require('./db')

app.use(express.static('dist'));
app.use(bodyparser.json())


//these take care of most recent movies


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
    console.log(req.body.title)
    new Movie(req.body).save()
        .then((savedMovie) => {
            res.status(200)
            res.send(savedMovie)
        })
        .catch(() => {
            res.status(404)
            console.log('MOVIE ALREADY IN DRAWER')
        })
   
})


// NOTHING BELOW THIS LINE

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.listen(PORT, () => {
    console.log(`LISTENING ON ${PORT}`)
})