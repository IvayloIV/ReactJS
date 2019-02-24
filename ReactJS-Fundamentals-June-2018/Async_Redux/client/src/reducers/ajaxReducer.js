import { AJAX_BEGIN, AJAX_ERROR, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, 
    CHIRP_SUCCESS, CREATE_CHIRP_SUCCESS, REMOVE_CHIRP_SUCCESS, DISCOVER_SUCCESS, 
    FOLLOW_SUCCESS, UNFOLLOW_SUCCESS } from '../actions/actionTypes';

export function ajaxReducer(state = 0, action) {
    switch (action.type) {
    case AJAX_BEGIN:
        return state + 1;
    case AJAX_ERROR:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case CHIRP_SUCCESS:
    case CREATE_CHIRP_SUCCESS:
    case REMOVE_CHIRP_SUCCESS:
    case DISCOVER_SUCCESS:
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS:
        return state - 1;
    default:
        return state;
    }
}