import { toast } from 'react-toastify';
import { GET_ALL_SONGS, LIKE_SONG, LISTEN_SONG, REMOVE_SONG, MY_SONGS } from '../actions/actionTypes';
import { createSong, getAllSongs, likeSong, listenSong, removeSong, mySongs } from '../api/remote';

export function allSongs(data) {
    return {
        type: GET_ALL_SONGS,
        data
    };
}

export function likeSongSuccess(songId) {
    return {
        type: LIKE_SONG,
        songId
    };
}

export function listenSongSuccess(songId) {
    return {
        type: LISTEN_SONG,
        songId
    };
}

export function removeSongSuccess(songId) {
    return {
        type: REMOVE_SONG,
        songId
    };
}

export function mySongsSuccess(data) {
    return {
        type: MY_SONGS,
        data
    };
}

function createSongAction(title, artist, imageURL) {
    return (dispatch) => {
        return createSong(title, artist, imageURL)
            .then((json) => {
                if (json.error) {
                    toast.error(json.description);
                } else {
                    toast.success('Song created successfully.');
                }
            });
    }
}

function getAllSongsAction() {
    return (dispatch) => {
        return getAllSongs()
            .then((data) => {
                dispatch(allSongs(data));
            });
    }
}

function likeSongAction(song) {
    return (dispatch) => {
        return likeSong(song)
            .then((data) => {
                if (!data.error) {
                    dispatch(likeSongSuccess(song._id));
                    toast.success('Liked!');
                } else {
                    toast.error(data.description);
                }
            });
    }
}

function listenSongAction(song) {
    return (dispatch) => {
        return listenSong(song)
            .then((data) => {
                if (!data.error) {
                    dispatch(listenSongSuccess(song._id));
                    toast.success(`You just listened ${song.title}`);
                } else {
                    toast.error(data.description);
                }
            });
    }
}

function removeSongAction(songId) {
    return (dispatch) => {
        return removeSong(songId)
            .then((data) => {
                if (!data.error) {
                    dispatch(removeSongSuccess(songId));
                    toast.success(`Song removed successfully!`);
                } else {
                    toast.error(data.description);
                }
            });
    }
}

function mySongsAction() {
    return (dispatch) => {
        return mySongs()
            .then((data) => {
                if (!data.error) {
                    dispatch(mySongsSuccess(data));
                } else {
                    toast.error(data.description);
                }
            });
    }
}

export { createSongAction, getAllSongsAction, likeSongAction, listenSongAction, removeSongAction, mySongsAction };
