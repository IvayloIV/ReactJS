import { HOTEL_SUCCESS, HOTEL_DETAILS_SUCCESS, CREATED_REVIEW_SUCCESS } from '../actions/actionTypes';

export function hotelReducer(state = [], action) {
    switch (action.type) {
        case HOTEL_SUCCESS:
            return action.data;
        case HOTEL_DETAILS_SUCCESS:
            return action.data;
        case CREATED_REVIEW_SUCCESS:
            state[0].reviews.unshift(action.data);
            return [state[0]];
        default:
            return state;
    }
}