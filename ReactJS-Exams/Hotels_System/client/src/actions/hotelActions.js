import { HOTEL_SUCCESS, HOTEL_DETAILS_SUCCESS } from '../actions/actionTypes';
import { createHotel, getHotelsPerPage, getHotelDetails } from '../api/remote';

function hotelSuccess(data) {
    return {
        type: HOTEL_SUCCESS,
        data
    };
}

function hotelDetails(data) {
    return {
        type: HOTEL_DETAILS_SUCCESS,
        data
    };
}

function createHotelAction(body) {
    return (dispatch) => {
        return createHotel(body)
            .then(json => {
                return json;
            });
    };
}

function getHotelsAction(page) {
    return (dispatch) => {
        return getHotelsPerPage(page)
            .then(json => {
                dispatch(hotelSuccess(json));
            });
    };
}

function getHotelsDetailsAction(id) {
    return (dispatch) => {
        return getHotelDetails(id)
            .then(json => {
                dispatch(hotelDetails([json]));
                return json;
            });
    };
}

export { createHotelAction, getHotelsAction, getHotelsDetailsAction };