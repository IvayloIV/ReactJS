import * as actionTypes from './actionTypes';

export default function reducer(state = [], action) {
    switch (action.type) {
        case actionTypes.ADD_INPUT:
            return [...state, {
                text: action.text,
                editMode: false,
                index: state.length
            }];
        case actionTypes.EDIT:
            return [
                ...state.slice(0, action.index),
                Object.assign({},
                    state[action.index],
                    { editMode: true }
                ),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.CANCEL_EDIT:
            return [
                ...state.slice(0, action.index),
                Object.assign({},
                    state[action.index],
                    { editMode: false }
                ),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.SUCCESS_EDIT:
            return [
                ...state.slice(0, action.index),
                Object.assign({},
                    state[action.index],
                    { editMode: false, text: action.text }
                ),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.REMOVE_INPUT:
            return [...state.slice(0, state.length - 1)];
        default:
            return state;
    }
}