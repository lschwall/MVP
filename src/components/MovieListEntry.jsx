import React from 'react';

const MovieEntry = ({ movie, deleteMovie, onRating, submitRating }) => (

    <div className="movie-container">
        <div id="movie-title">
            Title: { movie.title }
        </div>
        <div id="movie-img">
        Popularity: { movie.vote_average }
        </div>
        <div id="myrating">
        My Rating: { movie.personal_rating }
        </div>
        <div id="myrating">
        <input type="text" placeholder='Rate: 1 to 10' onChange={(event) => {onRating(event)}}/>
        <button onClick={() => {submitRating(movie.title, movie.personal_rating)}}>Update Rating</button>
        </div>
        <div id="button-div">
            <button onClick={() => {deleteMovie(movie.title)}}>Remove from Drawer</button>
        </div>
        <br />
    </div>

)

export default MovieEntry;