import React from "react"; 
import DrawerSearch from './DrawerSearch';
import MovieEntries from './MovieList';
import Result from './Result';
import Search from './Search';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movieData: [],
            searchText: null,
            movie: {},
            library: [],
            rating: null,
            drawerSearch: null
        }
        this.onSearch = this.onSearch.bind(this);
        this.movieSearch = this.movieSearch.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.onRating = this.onRating.bind(this);
        this.submitRating = this.submitRating.bind(this);
    }

    componentDidMount(){
            axios.get('/movies')
                .then(({ data }) => {
                    console.log('DATA',data)
                    this.setState({
                        library: data
                    })
                })
            }


/////////////////// MOVIE SEARCHES //////////////////////////////////////

    onSearch(e){
        this.setState({
            searchText: e.target.value,
        })
    }

    movieSearch(){
        let { searchText } = this.state;
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5495e84315f30d591c6c0f6313a22c41&language=en-US&query=${searchText}&page=1&include_adult=false`)
        .then(({ data }) => {
            console.log(data.results[0])
            this.setState({
                movie: data.results[0]
            })
        })
        .catch((err) => {
            window.alert('Error Searching Movie, please try again');
            console.log(err);
        })
    }

    addMovie(){
        let { movie } = this.state;
        axios.post(`http://localhost:8080/movies`, movie)
            .then(() => {
                axios.get('http://localhost:8080/')
                    .then(({ data }) => {
                        console.log(`Successfully posted ${data} to the Drawer`)
                    axios.get('/movies')
                        .then((movieData) => {
                            this.setState({
                                movieData: data,
                                movie: {},
                                library: movieData.data
                            })
                        })

                    })
            })
        
            .catch(err => {console.log('COULD NOT POST', err)})
    }


    onRating(event){
        this.setState({
            rating: event.target.value
        })
    }

    submitRating(movieTitle){
        let { rating } = this.state //grabs rating from state
        const options = {
            title: movieTitle,
            personal_rating: rating //passes rating as parameter
        }
        axios.post(`http://localhost:8080/updateMovie`, options)
            .then(() => {
                axios.get(`http://localhost:8080/movies`)
                    .then(results => this.setState({
                        library : results.data,
                    }))
            })
    }


    deleteMovie(movieTitle){
        axios.delete(`http://localhost:8080/movies?movieTitle=${movieTitle}`)
            .then(() => {
                axios.get('http://localhost:8080/movies')
                    .then(results => this.setState({library: results.data}))
            })
    }

////////////////////   END MOVIE SEARCH      ///////////////////////////




/////////////////// Drawer Search //////////////////////////////////////



////////////////////   END Drawer Search      /////////////////////////

    render(){
        const { movie, library, } = this.state;
        if(Object.keys(movie).length){
            return(
                <div className='container'>
                    <header className='titleContainer'>
                        <div id='title'>
                            The Movie Drawer
                        </div>
                    </header>
                    <div id='search'><Search onSearch={this.onSearch} movieSearch={this.movieSearch} /></div>
                    <div className='result'>
                        <Result movie={movie} addMovie={this.addMovie}  />
                    </div>
                    <div className='liner'>
                    <hr  style={{
                        color: '#8d93ab',
                        backgroundColor: '#8d93ab',
                        height: .5,
                        borderColor : '#8d93ab'
                    }}/>
                    </div>
                    <div id="movie-list">
                    <div className='nav' id='drawer_search'>
                        <DrawerSearch />
                    </div>
                        <MovieEntries movies={library} deleteMovie={this.deleteMovie} onRating={this.onRating} submitRating={this.submitRating} onSearch={this.onSearch} />
                    </div>
                </div>
            )
        }else{
            return(
                <div className='container'>
                    <header className='titleContainer'>
                        <div id='title'>
                            The Movie Drawer
                        </div>
                    </header>
                    <div id='search'><Search onSearch={this.onSearch} movieSearch={this.movieSearch} /></div>
                    <div className='liner'>
                    <hr  style={{
                        color: '#8d93ab',
                        backgroundColor: '#8d93ab',
                        height: .5,
                        borderColor : '#8d93ab'
                    }}/>
                    </div>
                    <div id="movie-list">
                        <MovieEntries movies={library} deleteMovie={this.deleteMovie} onRating={this.onRating} submitRating={this.submitRating}/>
                    </div>
                </div>
            )
        }
    }
}

export default App;