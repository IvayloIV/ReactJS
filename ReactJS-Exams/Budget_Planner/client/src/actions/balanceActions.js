import { PLAN_SUCCESS } from './actionTypes';
import { planByYear, defaultPlan } from '../api/remote';

function planSuccess(data) {
    return {
        type: PLAN_SUCCESS,
        data
    };
}

function planPerYearAction(year) {
    return (dispatch) => {
        return planByYear(year)
            .then(json => {
                dispatch(planSuccess(json));
            });
    };
}

function defaultPlanAction() {
    return (dispatch) => {
        return defaultPlan()
            .then(json => {
                dispatch(planSuccess(json));
            });
    };
}

export { planPerYearAction, defaultPlanAction };