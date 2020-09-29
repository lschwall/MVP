import React from 'react';
import MovieEntry from './MovieListEntry'

const MovieEntries = ({ movies, deleteMovie, onRating, submitRating, onSearch }) => (

    <div id="movie-list">
        <div>
            <h3>My Drawer</h3>
        </div>
            <div>   
                {movies.map((movie, index) => { return <MovieEntry movie={movie} key={index}
                deleteMovie={deleteMovie} onRating={onRating} submitRating={submitRating} />})}
            </div>
    </div>
)

export default MovieEntries;