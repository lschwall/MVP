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
        res.status(200).send(result)
    })
    .catch(err => {
        console.log('ERROR IN MOVIE RETRIEVAL', err)
    })
})

app.post('/movies',(req, res) => {
    console.log('title', req.body.title)
    console.log('body', req.body)
    console.log('poster',req.body.poster_path)
    if(req.body.title === undefined){
        res.status(500)
        console.log('PLEASE USE SEARCH BUTTON')
    }else{
        new Movie(req.body).save()
            .then((savedMovie) => {
                res.status(200)
                res.send(savedMovie)
            })
            .catch(() => {
                res.status(404)
                console.log('MOVIE ALREADY IN DRAWER')
            })
    }
   
})

app.delete('/movies', (req, res) => {
    // console.log(req.query)
    let {movieTitle} = req.query;
    Movie.deleteOne({title: movieTitle})
      .then( () => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500)
      })
  })

  app.post('/updateMovie', (req, res) => {
    let { title, personal_rating } = req.body;
    console.log('BODY',req.body)
    Movie.updateOne({title: title}, {personal_rating: personal_rating})
        .then(updateResult => {
            console.log(updateResult)
            res.status(200).send('Rating Updated')
        })
  })

// NOTHING BELOW THIS LINE

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.listen(PORT, () => {
    console.log(`LISTENING ON ${PORT}`)
})