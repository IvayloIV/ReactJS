import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovieDetailsAction, removeMovieAction } from '../../actions/movieActions';

class RemoveMovie extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: true,
            movieId: ''
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const movieId = this.props.match.params['id'];
        this.props.loadMovieDetails(movieId).then(() => {
            this.setState({
                loading: false,
                movieId: movieId
            });
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { movieId } = this.state;
        this.props.removeMovie(movieId).then((json) => {
            if (!json.error) {
                this.props.history.push('/movie/all');
            }
        });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const movie = this.props.movies[0];
        return (
            <div id="deleteMovie">
                <h1>Delete movie</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <label>Title</label>
                    <input type="text" name="title" value={movie.title} disabled="disabled" />
                    <label>Image Url</label>
                    <input type="text" name="imageUrl" value={movie.imageUrl} disabled="disabled" />
                    <label>Description</label>
                    <textarea type="text" name="description" value={movie.description} disabled="disabled" />
                    <label>Genres</label>
                    <input type="text" name="genres" value={movie.genres.join(',')} disabled="disabled" />
                    <label>Available Tickets</label>
                    <input type="number" name="tickets" value={movie.tickets} disabled="disabled" />
                    <input type="submit" value="Delete" />
                </form>
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
        removeMovie: (movieId) => dispatch(removeMovieAction(movieId))
    };
}

export default withRouter(connect(mapState, mapDispatch)(RemoveMovie));

