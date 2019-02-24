import { registerReducer, loginReducer, logoutReducer } from './authReducer';
import { chirpReducer } from './chirpReducer';
import { userReducer } from './userReducer';
import { ajaxReducer } from './ajaxReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
    chirps: chirpReducer,
    users: userReducer,
    ajaxCalls: ajaxReducer,
};