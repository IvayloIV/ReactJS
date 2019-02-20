import { registerReducer, loginReducer } from './authReducer';
import { balanceReducer } from './balanceReducer';
import { expenseReducer } from './expenseReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    balance: balanceReducer,
    expense: expenseReducer
};