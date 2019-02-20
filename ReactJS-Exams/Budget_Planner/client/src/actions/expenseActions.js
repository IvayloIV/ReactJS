import { BUDGET_PLANNER_SUCCESS, BUDGET_UPDATE_SUCCESS, ADD_EXPENSE_SUCCESS, REMOVE_EXPENSE_SUCCESS } from './actionTypes';
import { budgetPlaner, updateBudget, addNewExpenses, removeExpense } from '../api/remote';
import toastr from 'toastr';

function planerSuccess(data) {
    return {
        type: BUDGET_PLANNER_SUCCESS,
        data
    };
}

function updateBudgetSuccess(data) {
    return {
        type: BUDGET_UPDATE_SUCCESS,
        data
    };
}

function addNewExpensesSuccess(data) {
    return {
        type: ADD_EXPENSE_SUCCESS,
        data
    };
}

function removeExpenseSuccess(id) {
    return {
        type: REMOVE_EXPENSE_SUCCESS,
        id
    };
}

function budgetPlanerAction(year, month) {
    return (dispatch) => {
        return budgetPlaner(year, month)
            .then(json => {
                dispatch(planerSuccess(json));
            });
    };
}

function updateBudgetAction(year, month, income, budget) {
    return (dispatch) => {
        return updateBudget(year, month, {income, budget})
            .then(json => {
                dispatch(updateBudgetSuccess(json.plan));
                toastr.success('Updated successful.');
            });
    };
}

function addNewExpensesAction(year, month, body) {
    return (dispatch) => {
        return addNewExpenses(year, month, body)
            .then(json => {
                if (json.success) {
                    dispatch(addNewExpensesSuccess(json.expense));
                }

                return json;
            });
    };
}

function removeExpenseAction(expenseId) {
    return (dispatch) => {
        return removeExpense(expenseId)
        .then(json => {
                if (json.success) {
                    dispatch(removeExpenseSuccess(expenseId));
                }
            });
    };
}

export { budgetPlanerAction, updateBudgetAction, addNewExpensesAction, removeExpenseAction };