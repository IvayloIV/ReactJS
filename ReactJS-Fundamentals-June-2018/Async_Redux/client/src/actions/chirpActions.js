import { toast } from 'react-toastify';
import { CHIRP_SUCCESS, CREATE_CHIRP_SUCCESS, REMOVE_CHIRP_SUCCESS } from '../actions/actionTypes';
import { ajaxBeginAction } from './ajaxActions';
import { allChirps, countChirps, countFollowing, countFollowers, createChirp, feedByUsername, removeChirp } from '../api/remote';

function chirpSuccess(data) {
    return {
        type: CHIRP_SUCCESS,
        data
    };
}

function createChirpSuccess(data, myFeed) {
    return {
        type: CREATE_CHIRP_SUCCESS,
        data,
        myFeed
    };
}

function removeChirpSuccess(id) {
    return {
        type: REMOVE_CHIRP_SUCCESS,
        id
    };
}

function getChirpAction() {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return getHomeDate()
            .then(json => {
                dispatch(chirpSuccess(json));
            });
    };
}

function createChirpAction(data, myFeed) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return createChirp(data)
            .then(json => {
                dispatch(createChirpSuccess(json, myFeed));
            });
    };
}

function myFeedAction(username) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return getDate(username)
            .then(json => {
                dispatch(chirpSuccess(json));
            });
    };
}

function removeChirpAction(id) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return removeChirp(id)
            .then(() => {
                dispatch(removeChirpSuccess(id));
            });
    };
}

async function getHomeDate() {
    const chirps = await allChirps();
    let data = await getStatus(localStorage.getItem('username'));
    data.chirps = chirps.sort((a, b) => new Date(b['_kmd']['ect']) - new Date(a['_kmd']['ect']));
    return data;
}

async function getDate(username) {
    const chirps = await feedByUsername(username);
    let data = await getStatus(username);
    data.chirps = chirps.sort((a, b) => new Date(b['_kmd']['ect']) - new Date(a['_kmd']['ect']));
    return data;
}

async function getStatus(username) {
    const totalChirps = await countChirps(username);
    const following = await countFollowing(username);
    const followers = await countFollowers(username);

    return {
        chirpsCount: totalChirps.length,
        followingCount: following[0].subscriptions.length,
        followersCount: followers.length,
    };
}

export { getChirpAction, createChirpAction, myFeedAction, removeChirpAction };