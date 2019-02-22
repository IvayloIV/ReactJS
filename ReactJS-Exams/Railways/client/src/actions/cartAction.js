import { CART_GET_SUCCESS, REMOVE_ITEM_CART } from './actionTypes';
import { addTicket, getTickets, removeTicket, checkout, myTrains } from '../api/remote';

function cartSuccess(data) {
    return {
        type: CART_GET_SUCCESS,
        data
    };
}

function removeTicketSuccess(id) {
    return {
        type: REMOVE_ITEM_CART,
        id
    };
}

function addTicketAction(data) {
    return (dispatch) => {
        return addTicket(data)
            .then(json => {
                return json;
            });
    };
}

function getTicketsAction() {
    return (dispatch) => {
        return getTickets()
            .then(json => {
                dispatch(cartSuccess(json));
            });
    };
}

function removeTicketAction(id) {
    return (dispatch) => {
        return removeTicket(id)
            .then(json => {
                dispatch(removeTicketSuccess(id));
                return json;
            });
    };
}

function checkoutAction() {
    return (dispatch) => {
        return checkout()
            .then(json => {
                return json;
            });
    };
}

function myTrainsAction() {
    return (dispatch) => {
        return myTrains()
            .then(json => {
                dispatch(cartSuccess(json));
            });
    };
}

export { addTicketAction, getTicketsAction, removeTicketAction, checkoutAction, myTrainsAction };