import { registerReducer, loginReducer } from './authReducer';
import { recipeReducer } from './recipeReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    recipes: recipeReducer
};