import { toast } from 'react-toastify';
import { USER_PROFILE } from '../actions/actionTypes';
import { getUserById, removeUser } from '../api/remote';

function getUserSuccess(data) {
    return {
        type: USER_PROFILE,
        data
    };
}

function getUserProfileAction(userId) {
    return (dispatch) => {
        return getUserById(userId)
            .then(json => {
                dispatch(getUserSuccess(json));
                return json;
            });
    };
}

function removeUserAction(userId) {
    return (dispatch) => {
        return removeUser(userId)
            .then(json => {
                if (!json.error) {
                    sessionStorage.clear();
                    toast.success('User deleted.');
                } else {
                    toast.error(json.description);
                }

                return json;
            });
    };
}


export { getUserProfileAction, removeUserAction };