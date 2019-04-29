import { ALL_EVENTS, EVENT_DETAILS, JOIN_EVENT, MY_EVENTS } from '../actions/actionTypes';

function joinEvent(state, id) {
    const newState = state.slice();
    const eventIndex = state.findIndex(a => a._id === id);
    const event = newState[eventIndex];
    newState[eventIndex] = Object.assign({}, event, { peopleInterestedIn: Number(event.peopleInterestedIn) + 1 });
    return newState;
}

export function eventReducer(state = [], action) {
    switch (action.type) {
    case ALL_EVENTS:
        return action.data;
    case EVENT_DETAILS:
        return action.data;
    case JOIN_EVENT:
        return joinEvent(state, action.id);
    case MY_EVENTS:
        return action.data;
    default:
        return state;
    }
}