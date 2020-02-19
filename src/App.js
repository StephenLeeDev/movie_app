import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [], //The array for store movie's information.
  };

  //The function to get movie information.
  getMovies = async () => {
    const {
      data: {
        data: {movies},
      },
    } = await axios.get(
      'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
    ); //Get movie information from this URL.
    this.setState({movies, isLoading: false});
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state; //Work to skip "this.state.".
    return (
      <section className="container">
        {isLoading ? ( //If loading, print "Loading..." or print movies's Information
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
