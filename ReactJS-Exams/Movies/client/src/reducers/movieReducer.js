import { GET_ALL_MOVIES, GET_MY_MOVIES, MOVIE_DETAILS, BUY_TICKET } from '../actions/actionTypes';

function buyTicket(state, movieId) {
    const movieIndex = state.findIndex(m => m._id === movieId);
    let currentMovie = state[movieIndex];
    let newState = state.slice();
    newState[movieIndex] = Object.assign({}, currentMovie, {
        tickets: currentMovie.tickets - 1
    });

    return newState;
}

export function movieReducer(state = [], action) {
    switch (action.type) {
    case GET_ALL_MOVIES:
    case GET_MY_MOVIES:
    case MOVIE_DETAILS:
        return action.data;
    case BUY_TICKET:
        return buyTicket(state, action.movieId);
    default:
        return state;
    }
}