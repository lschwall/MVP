import React from 'react';

const Search = (props) => (
    <div className='search-bar'>
        <input type="text" onChange={(event) => {
          props.searchHandler(event)}} />
        <button onClick = {() => {
          props.movieSearch();
          
        }}>
          Search for Movie
        </button>
    </div>
);

export default Search;
