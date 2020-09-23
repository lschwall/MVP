import React from 'react';

const Result = ({ movie, addMovie }) => (
    <div className='results'>
        <h4>Search Movie Details:</h4>
        <div id ='movie'>
            <div className="result-image">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            </div>
            <div className="result-title">
                { movie.title }
            </div>
            <div className="result-desc">
                <span>{ movie.overview }</span>
            </div>
        </div>
        <div id='addButton'>
            <span>
                <button onClick={() => {addMovie()}}>Add to Drawer</button>
            </span>
        </div>
    </div>
);

export default Result;