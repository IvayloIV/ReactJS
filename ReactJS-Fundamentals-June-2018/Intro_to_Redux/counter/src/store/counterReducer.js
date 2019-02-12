import * as actionTypes from './actionTypes';

export default function calculatorReducer(state = [{ value: 0 }], action) {
    switch (action.type) {
        case actionTypes.INCREASE:
            return [
                ...state.slice(0, action.index),
                Object.assign({},
                    state[action.index],
                    { value: state[action.index].value + 1 }),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.DECREASE:
            return [
                ...state.slice(0, action.index),
                Object.assign({},
                    state[action.index],
                    { value: state[action.index].value - 1 }),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.CLEAR:
            return [
                ...state.slice(0, action.index),
                Object.assign({},
                    state[action.index],
                    { value: 0 }),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.ADD:
            return [...state, { value: 0 }];
        case actionTypes.REMOVE:
            return [...state.slice(0, state.length - 1)];
        default:
            return state;
    }
}