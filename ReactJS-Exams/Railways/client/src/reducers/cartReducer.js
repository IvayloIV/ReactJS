import { CART_GET_SUCCESS, REMOVE_ITEM_CART } from '../actions/actionTypes';

export function cartReducer(state = [], action) {
    switch (action.type) {
        case CART_GET_SUCCESS:
            return action.data;
            case REMOVE_ITEM_CART:
            return state.filter(a => a._id !== action.id);
        default:
            return state;
    }
}