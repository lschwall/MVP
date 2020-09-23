/*
INDEX IS A FUNCTIONAL COMPONENT THAT RETURNS A REACT ELEMENT.

*/

// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render(<App />, document.getElementById('root'));|

import React from 'react'; // => this gives minified err #130
import ReactDOM from 'react-dom';
import './styles.scss'
import App from './components/App';


ReactDOM.render(<App />, document.getElementById('root'))