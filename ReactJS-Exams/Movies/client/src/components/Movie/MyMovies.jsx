import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyMoviesAction, buyTicketAction } from '../../actions/movieActions';
import MovieCard from './MovieCard';

export class MyMovies extends Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  buyTicket({ _id, title, imageUrl, description, genres, tickets }) {
    this.props.buyTicket(_id, title, imageUrl, description, genres, tickets);
  }

  render() {
    const movies = this.props.movies.sort((a, b) => b.tickets - a.tickets);
    return (
      <div id="myMovies">
        <h1>My Movies</h1>
        <div className="movies">
        {movies.map(m => (
          <div key={m._id} className="movie">
            <MovieCard movie={m} />
            <div className="btn-group">
                <button><Link to={`/movie/edit/${m._id}`}>Edit</Link></button>
                <button><Link to={`/movie/remove/${m._id}`}>Delete</Link></button>
                <button><a href="javascript:void(0)" onClick={() => this.buyTicket(m)}>Buy Ticket</a></button>
                <button><Link to={`/movie/details/${m._id}`}>Details</Link></button>
            </div>
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
      loadMovies: () => dispatch(getMyMoviesAction()),
      buyTicket: (movieId, title, imageUrl, description, genres, tickets) => dispatch(buyTicketAction(movieId, title, imageUrl, description, genres, tickets))
  };
}

export default connect(mapState, mapDispatch)(MyMovies);
