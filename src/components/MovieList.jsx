import React from 'react';
import MovieEntry from './MovieListEntry'

const MovieEntries = ({ movies }) => (

    <div id="movie-list">
        <h3>What's in your drawer</h3>
        {movies.map((movie, index) => { return <MovieEntry movie={movie} key={index} />})}
    </div>

)

export default MovieEntries;