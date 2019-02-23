import { REVIEW_SUCCESS, CREATED_REVIEW_SUCCESS } from '../actions/actionTypes';
import { createReview } from '../api/remote';

function reviewSuccess(data) {
    return {
        type: REVIEW_SUCCESS,
        data
    };
}

function createReviewSuccess(data) {
    return {
        type: CREATED_REVIEW_SUCCESS,
        data
    };
}

function createReviewAction(id, body) {
    return (dispatch) => {
        return createReview(id, body)
            .then(json => {
                return dispatch(createReviewSuccess(json.review));
            });
    };
}

export { createReviewAction };