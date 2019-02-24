import { DISCOVER_SUCCESS, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS } from '../actions/actionTypes';
import { discover, follow, unfollow } from '../api/remote';
import { ajaxBeginAction } from './ajaxActions';

function discoverSuccess(data) {
    return {
        type: DISCOVER_SUCCESS,
        data
    };
}

function followSuccess() {
    return {
        type: FOLLOW_SUCCESS
    };
}

function unfollowSuccess() {
    return {
        type: UNFOLLOW_SUCCESS
    };
}

function discoverAction() {
    return (dispatch) => 
    {
        dispatch(ajaxBeginAction());
        return discover()
            .then(users => {
                for(let user of users) {
                    user.followers = users.filter(a => a.subscriptions.indexOf(user.username) > -1).length;
                }
                
                const currentUsername = localStorage.getItem('username');
                users = users.filter(u => u.username !== currentUsername);
                dispatch(discoverSuccess(users));
            });
    };
}

function followAction(username) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return follow(username)
            .then(() => {
                dispatch(followSuccess());
            });
    };
}

function unFollowAction(username) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return unfollow(username)
            .then(() => {
                dispatch(unfollowSuccess());
            });
    };
}

export { discoverAction, followAction, unFollowAction };