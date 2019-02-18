import { registerReducer, loginReducer } from './authReducer';
import { furnitureReducer } from './furnitureReducer';
import { statsReducer } from './statsReducer';
import { ajaxReducer } from './ajaxReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    furniture: furnitureReducer,
    stats: statsReducer,
    ajaxCalls: ajaxReducer
};