import { FETCH_FURNITURE_SUCCESS, REMOVE_FURNITURE, CREATE_REVIEW, CREATE_FURNITURE, LIKE_FURNITURE } from '../actions/actionTypes';
import { getFurnitureByPage, myFurniture, removeFurniture, detailsFurniture, createReview, likeFurniture, createFurniture } from '../api/remote';
import { ajaxBeginAction, ajaxErrorAction } from './ajaxActions';
import toastr from 'toastr';

function furnitureByPage(data) {
    return {
        type: FETCH_FURNITURE_SUCCESS,
        data
    };
}

function furnitureRemove(id) {
    return {
        type: REMOVE_FURNITURE,
        id
    };
}

function createReviewSuccess(id, data) {
    return {
        type: CREATE_REVIEW,
        id,
        data
    };
}

function likeFurnitureSuccess() {
    return {
        type: LIKE_FURNITURE,
    };
}

function create(data) {
    return {
        type: CREATE_FURNITURE,
        data
    };
}

function furnitureByPageAction(page) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return getFurnitureByPage(page)
            .then(json => {
                dispatch(furnitureByPage(json));
            });
    };
}

function myFurnitureAction(page) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return myFurniture(page)
            .then(json => {
                dispatch(furnitureByPage(json));
            });
    };
}

function removeFurnitureAction(id) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return removeFurniture(id).then(() => {
            dispatch(furnitureRemove(id));
            toastr.success('Removed successful.');
        });
    };
}

function detailsFurnitureAction(id) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return detailsFurniture(id).then((json) => {
            dispatch(furnitureByPage([json]));
        });
    };
}

function createReviewAction(id, data) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return createReview(id, data).then((json) => {
            if (json.success) {
                dispatch(createReviewSuccess(id, json.review));
                toastr.success('Created successful.');
            } else {
                for(let error of Object.entries(json.errors)){
                    toastr.error(error[1]);
                }
                dispatch(ajaxErrorAction());
            }

            return json;
        });
    };
}

function likeFurnitureAction(id) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return likeFurniture(id).then((res) => {
            if (res.success) {
                dispatch(likeFurnitureSuccess());
                toastr.success('Liked successful.');
            } else {
                toastr.error('You have already like post.');
                dispatch(ajaxErrorAction());
            }

            return res;
        });
    };
}

function createFurnitureAction(data) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return createFurniture(data)
            .then(json => {
                if (json.success) {
                    dispatch(create(json.furniture));
                    toastr.success('Created successful.');
                } else {
                    for(let error of Object.entries(json.errors)){
                        toastr.error(error[1]);
                    }
                    dispatch(ajaxErrorAction());
                }

                return json;
            })
    }
}

export { furnitureByPageAction, myFurnitureAction, removeFurnitureAction, detailsFurnitureAction, 
    createReviewAction, likeFurnitureAction, createFurnitureAction };
