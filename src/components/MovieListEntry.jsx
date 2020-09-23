import React from 'react';

const MovieEntry = ({ movie, deleteMovie }) => (

    <div className="movie-container">
        <div id="movie-title">
            Title: { movie.title }
        </div>
        <div id="movie-img">
        Popularity: { movie.vote_average }
        </div>
        <div id="button-div">
            <button onClick={() => {deleteMovie(movie.title)}}>Remove from Drawer</button>
        </div>
        <br />
    </div>

)

export default MovieEntry;