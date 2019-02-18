import { AJAX_BEGIN, AJAX_ERROR, REGISTER_SUCCESS, 
    LOGIN_SUCCESS, STATS_SUCCESS, FETCH_FURNITURE_SUCCESS, 
    REMOVE_FURNITURE, CREATE_REVIEW, LIKE_FURNITURE, CREATE_FURNITURE } from '../actions/actionTypes';

export function ajaxReducer(state = 0, action) {
    switch (action.type) {
    case AJAX_BEGIN:
        return state + 1;
    case AJAX_ERROR:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case STATS_SUCCESS:
    case FETCH_FURNITURE_SUCCESS:
    case REMOVE_FURNITURE:
    case CREATE_REVIEW:
    case LIKE_FURNITURE:
    case CREATE_FURNITURE:
        return state - 1;
    default:
        return state;
    }
}