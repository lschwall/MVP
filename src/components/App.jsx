import React from "react"; 
import Search from './Search';
import Result from './Result';
import MovieEntries from './MovieList';
import axios from 'axios';


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movieData: [],
            searchText: null,
            movie: {},
            library: [],
            rating: null
        }
        this.onSearch = this.onSearch.bind(this);
        this.movieSearch = this.movieSearch.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.onRating = this.onRating.bind(this);
        this.submitRating = this.submitRating.bind(this);
    }

/*

axios.get from API
    then
        post that information to the endpoint in the server /movies
*/
    componentDidMount(){
            axios.get('/movies')
                .then(({ data }) => {
                    console.log('DATA',data)
                    this.setState({
                        library: data
                    })
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

    onSearch(e){
        
        this.setState({
            searchText: e.target.value
        })
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
                        library : results.data
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

    render(){
        const { movie, library, } = this.state;
        return(
            <div className='container'>
                <div id='title'>
                    <h1>Welcome to <i>The Movie Drawer</i></h1>
                </div>
                <div id='search'><Search onSearch={this.onSearch} movieSearch={this.movieSearch} /></div>
                <div>
                    <Result movie={movie} addMovie={this.addMovie}  />
                </div>
                <div id="movie-list">
                    <MovieEntries movies={library} deleteMovie={this.deleteMovie} onRating={this.onRating} submitRating={this.submitRating}/>
                </div>
            </div>
        )
    }
}

export default App;