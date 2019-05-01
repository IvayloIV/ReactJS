import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovieDetailsAction, buyTicketAction } from '../../actions/movieActions';

class MovieDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    componentDidMount() {
        const movieId = this.props.match.params['id'];
        this.props.loadMovieDetails(movieId).then(() => {
            this.setState({ loading: false });
        });
    }

    buyTicket({ _id, title, imageUrl, description, genres, tickets }) {
        this.props.buyTicket(_id, title, imageUrl, description, genres, tickets);
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const movie = this.props.movies[0];
        return (
            <div id="detailsMovie">
            <h1>Details</h1>
                <div className="movie">
                    <h2>Title: Us (2019)</h2>
                    <img src={movie.imageUrl} />
                    <p>{movie.description}</p>
                    <h2>Genres</h2>
                    <ul className="genres">
                        <li>{movie.genres.join(',')}</li>
                    </ul>
                    <p>Available Tickets: {movie.tickets}</p>
                    <button><a href="javascript:void(0)" onClick={() => this.buyTicket(movie)}>Buy Ticket</a></button>
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
        loadMovieDetails: (movieId) => dispatch(getMovieDetailsAction(movieId)),
        buyTicket: (movieId, title, imageUrl, description, genres, tickets) => dispatch(buyTicketAction(movieId, title, imageUrl, description, genres, tickets))
    };
}

export default connect(mapState, mapDispatch)(MovieDetails);

