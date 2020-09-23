import React from 'react';

const MovieEntry = ({ movie, deleteMovie, onRating, submitRating }) => (

    <div className="movie-container">
        <div className="movie-image">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt='poster'/>
        </div>
        <div id="movie-title">
            Title:
            <div className="movie-name">
                { movie.title }
            </div> 
        </div>
        <div id="movie-img">
            Popularity: 
            <div className="votes">
                { movie.vote_average }
            </div>
        </div>
        <div id="myrating">
            My Rating: 
            <div className="movie-rating">
                { movie.personal_rating }
            </div>
        </div>
        <div id="my-rating">
            <div className="personal-rating">
                <input className='one' type="text" placeholder='Rate: 1 to 10' onChange={(event) => {onRating(event)}}/>
            </div>
        </div>
        <div>
            <button onClick={() => {submitRating(movie.title, movie.personal_rating)}}>Update Rating</button>
        </div>
        <div id="button-div">
            <button onClick={() => {deleteMovie(movie.title)}}>Remove from Drawer</button>
        </div>
    </div>

)

export default MovieEntry;