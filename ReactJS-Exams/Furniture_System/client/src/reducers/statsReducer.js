import { STATS_SUCCESS, REGISTER_SUCCESS,CREATE_FURNITURE, REMOVE_FURNITURE } from '../actions/actionTypes';

export function statsReducer(state = { furniture: 0, users: 0 }, action) {
    switch (action.type) {
        case STATS_SUCCESS:
            return action.data;
        case REGISTER_SUCCESS:
            return { furniture: state.furniture, users: state.users + 1 };
        case CREATE_FURNITURE:
            return { furniture: state.furniture + 1, users: state.users };
        case REMOVE_FURNITURE:
            return { furniture: state.furniture - 1, users: state.users };
        default:
            return state;
    }
}