import { toast } from 'react-toastify';
import { ALL_EVENTS, EVENT_DETAILS, JOIN_EVENT, MY_EVENTS } from '../actions/actionTypes';
import { getAllEvents, createEvent, getEventDetails, editEvent, joinEvent, removeEvent, getMyEvents } from '../api/remote';

function getAllEventsSuccess(data) {
    return {
        type: ALL_EVENTS,
        data
    };
}

function getEventDetailsSuccess(data) {
    return {
        type: EVENT_DETAILS,
        data
    };
}

function joinEventSuccess(id) {
    return {
        type: JOIN_EVENT,
        id
    };
}

function myEventsSuccess(data) {
    return {
        type: MY_EVENTS,
        data
    };
}

function getAllEventsAction() {
    return (dispatch) => {
        return getAllEvents()
            .then(json => {
                dispatch(getAllEventsSuccess(json));
            });
    };
}

function createEventAction(name, dateTime, description, imageUrl) {
    return (dispatch) => {
        return createEvent(name, dateTime, description, imageUrl)
            .then(json => {
                showMessage(json, 'Event created successfully.');
                return json;
            });
    };
}

function detailsEventAction(eventId) {
    return (dispatch) => {
        return getEventDetails(eventId)
            .then(json => {
                if (!json.error) {
                    dispatch(getEventDetailsSuccess([json]));
                } else {
                    toast.error(json.description);
                }

                return json;
            });
    };
}

function editEventAction(eventId, body) {
    return (dispatch) => {
        return editEvent(eventId, body)
            .then(json => {
                showMessage(json, 'Edited successfully.');
                return json;
            });
    };
}

function removeEventAction(eventId) {
    return (dispatch) => {
        return removeEvent(eventId)
            .then(json => {
                showMessage(json, 'Event closed successfully.');
                return json;
            });
    };
}

function joinEventAction(eventId, body) {
    return (dispatch) => {
        return joinEvent(eventId, body)
            .then(json => {
                if (!json.error) {
                    dispatch(joinEventSuccess(eventId));
                }

                showMessage(json, 'You join the event successfully.');
                return json;
            });
    };
}

function myEventsAction() {
    return (dispatch) => {
        return getMyEvents()
            .then(json => {
                dispatch(myEventsSuccess(json));
                return json;
            });
    };
}

function showMessage(json, message) {
    if (!json.error) {
        toast.success(message);
    } else {
        toast.error(json.description);
    }
}

export { getAllEventsAction, createEventAction, detailsEventAction, editEventAction, 
    removeEventAction, joinEventAction, myEventsAction };