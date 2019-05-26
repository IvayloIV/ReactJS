import { USER_PROFILE } from '../actions/actionTypes';

export function userReducer(state = {}, action) {
    switch (action.type) {
    case USER_PROFILE:
        return action.data;
    default:
        return state;
    }
}