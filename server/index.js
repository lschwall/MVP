require('dotenv').config();
const express = require('express')
const app = express();
const { PORT } = process.env;


app.listen(PORT, () => {
    console.log(`LISTENING ON ${PORT}`)
}
)
   //////////////////
  //   requests   //
 //////////////////
app.get('/', (req, res) => {
    res.send('THE SHIT IS BIG DUMB')
})

    //post to server
app.post('', () => {})