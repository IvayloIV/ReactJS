import { registerReducer, loginReducer } from './authReducer';
import { tripReducer } from './tripReducer';
import { cartReducer } from './cartReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    trip: tripReducer,
    cart: cartReducer
};