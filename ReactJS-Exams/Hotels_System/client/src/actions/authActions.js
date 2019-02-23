import { toast } from 'react-toastify';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED } from '../actions/actionTypes';
import { login, register } from '../api/remote';

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

function registerAction(name, email, password) {
    return (dispatch) => {
        return register(name, email, password)
            .then(json => {
                if (json.success) {
                    dispatch(registerSuccess());
                }

                return json;
            });
    };
}

function loginAction(email, password, msg) {
    return (dispatch) => {
        return login(email, password)
            .then(json => {
                if (json.success) {
                    localStorage.setItem('authToken', json.token);
                    localStorage.setItem('user', json.user.name);
                    dispatch(loginSuccess());
                    toast.success(`${msg || 'Login'} successful.`);
                } else {
                    toast.error(json.message);
                }
            });
    };
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear();
    };
}

export { registerAction, loginAction, logoutAction };