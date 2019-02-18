import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, STATS_SUCCESS } from '../actions/actionTypes';
import { login, register, getStats } from '../api/remote';
import { ajaxBeginAction, ajaxErrorAction } from './ajaxActions';
import toastr from 'toastr';

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    };
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function redirect() {
    return {
        type: REDIRECTED
    };
}


export function statsSuccess(data) {
    return {
        type: STATS_SUCCESS,
        data
    };
}

function registerAction(name, email, password) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return register(name, email, password)
            .then(json => {
                if (json.success) {
                    dispatch(registerSuccess());
                    toastr.success('Register successful!');
                } else {
                    dispatch(ajaxErrorAction());
                    toastr.error(json.message);
                }
            });
    };
}

function loginAction(email, password) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return login(email, password)
            .then(json => {
                if (json.success) {
                    localStorage.setItem('authToken', json.token);
                    localStorage.setItem('user', json.user.name);
                    dispatch(loginSuccess());
                } else {
                    dispatch(ajaxErrorAction());
                    toastr.error(json.message);
                }

                return json;
            });
    };
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear();
        toastr.success('Logout success.');
    };
}

function statsAction() {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return getStats()
            .then(data => {
                dispatch(statsSuccess(data));
            })
    }
}

export { registerAction, loginAction, logoutAction, statsAction };
