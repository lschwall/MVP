import React from 'react';

const Search = ({ onSearch, movieSearch }) => (
    <div className='search-bar'>
        <input type="text" onChange = {(event) => {onSearch(event)}} />
        <button onClick = {() => {movieSearch()}}>
          Search for Movie
        </button>
    </div>
)

export default Search;
