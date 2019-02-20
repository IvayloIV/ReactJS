import { BUDGET_PLANNER_SUCCESS, BUDGET_UPDATE_SUCCESS, ADD_EXPENSE_SUCCESS, REMOVE_EXPENSE_SUCCESS } from '../actions/actionTypes';

export function expenseReducer(state = {}, action) {
    switch (action.type) {
        case BUDGET_PLANNER_SUCCESS:
            return action.data;
        case BUDGET_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                income: action.data.income,
                budget: action.data.budget
            });
        case ADD_EXPENSE_SUCCESS:
            let current = state.expenses.slice();
            return {
                income: state.income,
                budget: state.budget,
                expenses: current
            };
        case REMOVE_EXPENSE_SUCCESS:
            let expenses = state.expenses.filter(a => a.id !== action.id);
            return {
                income: state.income,
                budget: state.budget,
                expenses
            };
        default:
            return state;
    }
}
