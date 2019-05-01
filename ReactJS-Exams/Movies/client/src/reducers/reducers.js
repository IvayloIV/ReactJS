import { registerReducer, loginReducer } from './authReducer';
import { movieReducer } from './movieReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    movies: movieReducer
};