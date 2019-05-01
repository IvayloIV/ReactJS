import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllMoviesAction, buyTicketAction } from '../../actions/movieActions';
import MovieCard from './MovieCard';
import Search from './Search';

export class Cinema extends Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  buyTicket({ _id, title, imageUrl, description, genres, tickets }) {
    this.props.buyTicket(_id, title, imageUrl, description, genres, tickets);
  }

  render() {
    let movies = this.props.movies.sort((a, b) => b.tickets - a.tickets);
    const searchGenre = this.props.location.search.split('=')[1];

    if (searchGenre) {
      movies = movies.filter(a => a.genres.indexOf(searchGenre) !== -1);
    }
    
    return (
      <div id="cinema">
      <h1>All Movies</h1>
      <Search genre={searchGenre} />
      <div className="movies">
        {movies.map(m => (
          <div key={m._id} className="movie">
            <MovieCard movie={m} />
            <button><a href="javascript:void(0)" onClick={() => this.buyTicket(m)}>Buy Ticket</a></button>
            <button><Link to={`/movie/details/${m._id}`}>Details</Link></button>
          </div>
        ))}
      </div>
    </div>
    )
  }
}

function mapState(state) {
  return {
      movies: state.movies
  };
}

function mapDispatch(dispatch) {
  return {
      loadMovies: () => dispatch(getAllMoviesAction()),
      buyTicket: (movieId, title, imageUrl, description, genres, tickets) => dispatch(buyTicketAction(movieId, title, imageUrl, description, genres, tickets))
  };
}

export default connect(mapState, mapDispatch)(Cinema);
