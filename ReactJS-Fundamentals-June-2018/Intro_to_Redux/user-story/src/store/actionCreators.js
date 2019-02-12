import * as actionTypes from './actionTypes';

export function addInput(text) {
    return {
        type: actionTypes.ADD_INPUT,
        text
    }
}

export function removeInput() {
    return {
        type: actionTypes.REMOVE_INPUT
    }
}

export function edit(index) {
    return {
        type: actionTypes.EDIT,
        index
    }
}

export function cancel(index) {
    return {
        type: actionTypes.CANCEL_EDIT,
        index
    }
}

export function success(index, text) {
    return {
        type: actionTypes.SUCCESS_EDIT,
        index,
        text
    }
}