import { TRIPS_SUCCESS } from './actionTypes';
import { getTrips, searchTrips, getDetails, addTicket } from '../api/remote';

function tripSuccess(data) {
    return {
        type: TRIPS_SUCCESS,
        data
    };
}

function tripSuccessAction() {
    return (dispatch) => {
        return getTrips()
            .then(json => {
                dispatch(tripSuccess(json));
            });
    };
}

function searchTripAction(origin, destination, date) {
    return (dispatch) => {
        return searchTrips(origin, destination, date)
            .then(json => {
                dispatch(tripSuccess(json));
            });
    };
}

function tripDetailsAction(id) {
    return (dispatch) => {
        return getDetails(id)
            .then(json => {
                dispatch(tripSuccess([json]));
            });
    };
}

export { tripSuccessAction, searchTripAction, tripDetailsAction };