import { registerReducer, loginReducer } from './authReducer';
import { eventReducer } from './eventReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    events: eventReducer
};