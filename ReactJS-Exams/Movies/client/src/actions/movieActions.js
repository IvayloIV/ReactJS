import { toast } from 'react-toastify';
import { GET_ALL_MOVIES, GET_MY_MOVIES, MOVIE_DETAILS, BUY_TICKET } from '../actions/actionTypes';
import { createMovie, getAllMovies, getMyMovies, getMovieDetails, editMovie, removeMovie } from '../api/remote';

function getAllMoviesSuccess(data) {
    return {
        type: GET_ALL_MOVIES,
        data
    };
}

function getMyMoviesSuccess(data) {
    return {
        type: GET_MY_MOVIES,
        data
    };
}

function getMovieDetailsSuccess(data) {
    return {
        type: MOVIE_DETAILS,
        data
    };
}

function buyTicketSuccess(movieId) {
    return {
        type: BUY_TICKET,
        movieId
    };
}

function createMovieAction(title, imageUrl, description, genres, tickets) {
    return (dispatch) => {
        return createMovie(title, imageUrl, description, genres, tickets)
            .then(json => {
                showMessage(json, 'Movie created successfully.');
                return json;
            });
    };
}

function getAllMoviesAction() {
    return (dispatch) => {
        return getAllMovies()
            .then(json => {
                if (!json.error) {
                    dispatch(getAllMoviesSuccess(json));
                } else {
                    json.error(json.description);
                }
                return json;
            });
    };
}

function getMyMoviesAction() {
    return (dispatch) => {
        return getMyMovies()
            .then(json => {
                if (!json.error) {
                    dispatch(getMyMoviesSuccess(json));
                } else {
                    json.error(json.description);
                }
                return json;
            });
    };
}

function getMovieDetailsAction(movieId) {
    return (dispatch) => {
        return getMovieDetails(movieId)
            .then(json => {
                if (!json.error) {
                    dispatch(getMovieDetailsSuccess([json]));
                } else {
                    json.error(json.description);
                }
                return json;
            });
    };
}

function editMovieAction(movieId, title, imageUrl, description, genres, tickets) {
    return (dispatch) => {
        return editMovie(movieId, title, imageUrl, description, genres, tickets)
            .then(json => {
                showMessage(json, 'Movie edit successfully.');
                return json;
            });
    };
}

function removeMovieAction(movieId) {
    return (dispatch) => {
        return removeMovie(movieId)
            .then(json => {
                showMessage(json, 'Movie removed successfully!');
                return json;
            });
    };
}

function buyTicketAction(movieId, title, imageUrl, description, genres, tickets) {
    return (dispatch) => {
        if (tickets <= 0) {
            toast.error('Out of tickets.');
            return;
        }
        tickets--;
        return editMovie(movieId, title, imageUrl, description, genres, tickets)
            .then(json => {
                if (!json.error) {
                    dispatch(buyTicketSuccess(movieId));
                }
                showMessage(json, `Successfully bought ticket for ${title}!`);
                return json;
            });
    };
}

function showMessage(json, msg) {
    if (!json.error) {
        toast.success(msg);
    } else {
        toast.error(json.description);
    }
}

export { createMovieAction, getAllMoviesAction, getMyMoviesAction, getMovieDetailsAction, 
    editMovieAction, removeMovieAction, buyTicketAction };