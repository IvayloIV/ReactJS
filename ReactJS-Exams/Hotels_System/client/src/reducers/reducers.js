import { registerReducer, loginReducer } from './authReducer';
import { hotelReducer } from './hotelReduces';

export default {
    register: registerReducer,
    login: loginReducer,
    hotel: hotelReducer
};