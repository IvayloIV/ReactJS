import { GET_ALL_MEMES, GET_DETAILS_MEME, REMOVE_MEME, USER_MEMES } from '../actions/actionTypes';

export function memeReducer(state = [], action) {
    switch (action.type) {
    case GET_ALL_MEMES:
    case GET_DETAILS_MEME:
    case USER_MEMES:
        return action.data;
    case REMOVE_MEME:
        return state.filter(a => a._id !== action.id);
    default:
        return state;
    }
}