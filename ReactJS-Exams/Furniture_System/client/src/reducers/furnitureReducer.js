import { CREATE_FURNITURE, FETCH_FURNITURE_SUCCESS, REMOVE_FURNITURE, CREATE_REVIEW, LIKE_FURNITURE } from '../actions/actionTypes';

export function furnitureReducer(state = [], action) {
    switch (action.type) {
    case FETCH_FURNITURE_SUCCESS: 
        return action.data;
    case CREATE_FURNITURE:
        return [action.data];
    case REMOVE_FURNITURE:
        return state.filter(a => a.id !== action.id);
    case CREATE_REVIEW:
        let furniture = state[0];
        if (!furniture['reviews']) {
            furniture['reviews'] = [];
        }
        furniture['reviews'].push(action.data);
        return [furniture];
    case LIKE_FURNITURE:
        let current = state[0];
        current.likes++;
        return [current];
    default:
        return state;
    }
}