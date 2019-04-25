import { GET_ALL_SONGS, LIKE_SONG, LISTEN_SONG, REMOVE_SONG, MY_SONGS } from '../actions/actionTypes';

function getNewState(state, action, type) {
    const songIndex = state.findIndex(a => a._id === action.songId);
    const newSongs = state.slice();
    const currentSong = newSongs[songIndex];
    newSongs[songIndex] = Object.assign({}, currentSong, { [type]: currentSong[type] + 1 });
    return newSongs;
}

export function songReducer(state = [], action) {
    switch (action.type) {
        case GET_ALL_SONGS:
            return action.data;
        case LIKE_SONG:
            return getNewState(state, action, 'likes');
            case LISTEN_SONG:
            return getNewState(state, action, 'listened');
        case REMOVE_SONG:
            return state.filter(s => s._id !== action.songId);
        case MY_SONGS:
            return action.data;
        default:
            return state;
    }
}