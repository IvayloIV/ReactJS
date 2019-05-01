import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { getMovieDetailsAction, editMovieAction } from '../../actions/movieActions';

class EditMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            movieId: '',
            title: '',
            imageUrl: '',
            description: '',
            genres: '',
            tickets: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const movieId = this.props.match.params['id'];
        this.props.getDetailsMovie(movieId).then((data) => {
            this.setState({
                loading: false,
                movieId: movieId,
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.description,
                genres: data.genres.join(','),
                tickets: data.tickets
            });
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let { title, imageUrl, description, genres, tickets } = this.state;
        const movieId = this.state.movieId;

        if (title.length < 6) {
            toast.error('The title should be at least 6 characters long.');
            return;
        }

        if (description.length < 10) {
            toast.error('The description should be at least 10 characters long.');
            return;
        }

        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            toast.error('The image should start with "http://" or "https://".');
            return;
        }

        if (isNaN(tickets)) {
            toast.error('The available tickets should be a number.');
            return;
        }

        genres = genres.split(',');
        this.props.editMovie(movieId, title, imageUrl, description, genres, Number(tickets))
            .then((json) => {
                if (!json.error) {
                    this.props.history.push(`/movie/details/${movieId}`);
                }
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }
        
        return (
            <div id="editMovie">
                <h1>Edit movie</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="title"
                        value={this.state.title}
                        onChange={this.onChangeHandler}
                        label="Title"
                    />
                    <Input
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.onChangeHandler}
                        label="Image URL"
                    />
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="genres"
                        value={this.state.genres}
                        onChange={this.onChangeHandler}
                        label="Genres"
                    />
                    <Input
                        name="tickets"
                        type="number"
                        value={this.state.tickets}
                        onChange={this.onChangeHandler}
                        label="Available Tickets"
                    />
                    <input type="submit" value="Edit" />
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
        getDetailsMovie: (movieId) => dispatch(getMovieDetailsAction(movieId)),
        editMovie: (movieId, title, imageUrl, description, genres, tickets) => dispatch(editMovieAction(movieId, title, imageUrl, description, genres, tickets))
    };
}

export default withRouter(connect(mapState, mapDispatch)(EditMovie));
