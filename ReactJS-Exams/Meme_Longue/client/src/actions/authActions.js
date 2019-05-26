import { toast } from 'react-toastify';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGOUT_SUCCESS } from '../actions/actionTypes';
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

function registerAction(username, password, avatarUrl, email) {
    return (dispatch) => {
        return register(username, password, avatarUrl, email)
            .then(json => {
                if (!json.error) {
                    saveSession(json);
                    dispatch(registerSuccess());
                    toast.success(`User registration successful.`);
                } else {
                    toast.error(json.description);
                }

                return json;
            });
    };
}

function loginAction(username, password) {
    return (dispatch) => {
        return login(username, password)
            .then(json => {
                if (!json.error) {
                    saveSession(json);
                    dispatch(loginSuccess());
                    toast.success(`Login successful.`);
                } else {
                    toast.error(json.description);
                }
            });
    };
}

function logoutAction() {
    return (dispatch) => {
        return logout()
            .then(() => {
                sessionStorage.clear();
                dispatch(logoutSuccess());
                toast.success(`Logout successful.`);
            });
    }
}

function saveSession(data) {
    sessionStorage.setItem('authToken', data._kmd.authtoken);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('userId', data._id);
}

export { registerAction, loginAction, logoutAction };