import { registerReducer, loginReducer, logoutReducer } from './authReducer';
import { songReducer } from './songReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
    songs: songReducer
};
