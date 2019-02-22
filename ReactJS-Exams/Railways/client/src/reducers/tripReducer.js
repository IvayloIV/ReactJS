import { TRIPS_SUCCESS } from '../actions/actionTypes';

export function tripReducer(state = [], action) {
    switch (action.type) {
        case TRIPS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}