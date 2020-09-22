import React from "react"; // <=  react is undefined
// import Search from './Search'

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div class='container'>
                <div id='title'>
                    <h1>Welcome to <i>The Movie Drawer</i></h1>
                </div>
                <div id='search' class='search'>
                        <input type="text" />
                        <button>
                            Add to Drawer
                        </button>
                </div>
                <div class = 'results_container'>
                </div>
            </div>
        )
    }
}

export default App;