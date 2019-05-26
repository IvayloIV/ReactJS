import { registerReducer, loginReducer } from './authReducer';
import { memeReducer } from './memeReducer';
import { userReducer } from './userReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    memes: memeReducer,
    user: userReducer,
};