import React from 'react';

const Search = ({ onSearch, movieSearch }) => (
    <div className='search-bar'>
        <input type="text" className='inputtext' onChange = {(event) => {onSearch(event)}} placeholder='Search Here' />
        <div>
            <button className='searchBtn' type='submit' onClick = {() => {movieSearch()}}>
                <i className="icon-search"></i>
            </button>
        </div>
    </div>
)

export default Search;
