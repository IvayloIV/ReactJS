import { DISCOVER_SUCCESS } from '../actions/actionTypes';

export function userReducer(state = [], action) {
    switch (action.type) {
        case DISCOVER_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
