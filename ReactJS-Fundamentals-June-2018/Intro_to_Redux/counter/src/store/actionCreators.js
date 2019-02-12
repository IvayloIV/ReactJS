import * as actionTypes from './actionTypes';

export function increase(index) {
    return {
        type: actionTypes.INCREASE,
        index
    }
}

export function decrease(index) {
    return {
        type: actionTypes.DECREASE,
        index
    }
}

export function clear(index) {
    return {
        type: actionTypes.CLEAR,
        index
    }
}

export function add() {
    return {
        type: actionTypes.ADD
    }
}

export function remove() {
    return {
        type: actionTypes.REMOVE
    }
}