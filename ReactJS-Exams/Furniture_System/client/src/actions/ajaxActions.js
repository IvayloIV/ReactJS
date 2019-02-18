import { AJAX_BEGIN, AJAX_ERROR } from '../actions/actionTypes';

export function ajaxBeginAction() {
    return {
        type: AJAX_BEGIN
    };
}

export function ajaxErrorAction() {
    return {
        type: AJAX_ERROR
    };
}
