import { registerReducer, loginReducer } from './authReducer';
import { petReducer } from './petReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    pets: petReducer
};