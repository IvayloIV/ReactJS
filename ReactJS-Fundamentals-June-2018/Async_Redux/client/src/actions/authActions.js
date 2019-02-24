import { toast } from 'react-toastify';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, REDIRECTED } from '../actions/actionTypes';
import { ajaxBeginAction, ajaxErrorAction } from './ajaxActions';
import { login, register, logout } from '../api/remote';

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

function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    };
}

export function redirect() {
    return {
        type: REDIRECTED
    };
}

function registerAction(username, password) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return register(username, password)
            .then(json => {
                if (!json.error) {
                    dispatch(registerSuccess());
                } else {
                    dispatch(ajaxErrorAction());
                }

                return json;
            });
    };
}

function loginAction(username, password, msg) {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return login(username, password)
            .then(json => {
                if (!json.error) {
                    localStorage.setItem('authToken', json._kmd.authtoken);
                    localStorage.setItem('username', json.username);
                    localStorage.setItem('userId', json._id);
                    localStorage.setItem('subs', JSON.stringify(json.subscriptions || []));
                    dispatch(loginSuccess());
                    toast.success(`${msg || 'Login'} successful.`);
                } else {
                    dispatch(ajaxErrorAction());
                    toast.error(json.error);
                }
            });
    };
}

function logoutAction() {
    return (dispatch) => {
        dispatch(ajaxBeginAction());
        return logout()
            .then(() => {
                localStorage.clear();
                dispatch(logoutSuccess());
            });
    };
}

export { registerAction, loginAction, logoutAction };