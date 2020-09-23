import React from 'react';

const Result = ({ movie, addMovie }) => (
    <div className='result'>
        <h4>Search Movie Details:</h4>
        <div id ='movie'>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            <h4>{ movie.title }</h4>
            <span>{ movie.overview }</span>
        </div>
        <div id='addButton'>
            <span>
                <button onClick={() => {addMovie()}}>Add to Drawer</button>
            </span>
        </div>
    </div>
);

export default Result;