import React from "react"; // <=  react is undefined
import Search from './Search'
import Results from './Result';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            movie: {},
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.onClick = this.onClick.bind(this);
        this.movieSearch = this.movieSearch.bind(this);
    }

/*

axios.get from API
    then
        post that information to the endpoint in the server /movies
*/

    movieSearch(){
        let { searchText } = this.state;
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5495e84315f30d591c6c0f6313a22c41&language=en-US&query=${searchText}&page=1&include_adult=false`)
        .then(result => {
            console.log(result)
            this.setState({
                movie: result.data.results[0]
            })
        })
    }


    searchHandler(e){

        this.setState({
            searchText: e.target.value
        })
    }

    onClick(){
        console.log('clicked')
    }

    render(){
        return(
            <div className='container'>
                <div id='title'>
                    <h1>Welcome to <i>The Movie Drawer</i></h1>
                </div>
                <div id='search'><Search searchHandler={this.searchHandler} movieSearch={this.movieSearch} /></div>
                <div>
                    <Results />
                </div>
            </div>
        )
    }
}

export default App;