import { PLAN_SUCCESS } from '../actions/actionTypes';

export function balanceReducer(state = {}, action) {
    switch (action.type) {
        case PLAN_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
