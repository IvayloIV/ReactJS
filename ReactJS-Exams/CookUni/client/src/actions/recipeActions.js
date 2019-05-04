import { toast } from 'react-toastify';
import { GET_ALL_RECIPES, GET_RECIPE_DETAILS, LIKE_RECIPE } from '../actions/actionTypes';
import { getRecipes, createRecipe, getRecipeDetails, editRecipe, removeRecipe, likeRecipe } from '../api/remote';

function getRecipesSuccess(data) {
    return {
        type: GET_ALL_RECIPES,
        data
    };
}

function recipeDetailsSuccess(data) {
    return {
        type: GET_RECIPE_DETAILS,
        data
    };
}

function likeRecipeSuccess() {
    return {
        type: LIKE_RECIPE
    };
}

function getRecipesAction() {
    return (dispatch) => {
        return getRecipes()
            .then(json => {
                dispatch(getRecipesSuccess(json));
                return json;
            });
    };
}

function createRecipeAction(payload) {
    return (dispatch) => {
        return createRecipe(payload)
            .then(json => {
                showMessage(json, 'Recipe created successfully.');
                return json;
            });
    };
}

function recipeDetailsAction(recipeId) {
    return (dispatch) => {
        return getRecipeDetails(recipeId)
            .then(json => {
                dispatch(recipeDetailsSuccess([json]));
                return json;
            });
    };
}

function editRecipeAction(recipeId, payload) {
    return (dispatch) => {
        return editRecipe(recipeId, payload)
            .then(json => {
                showMessage(json, 'Edited successful.');
                return json;
            });
    };
}

function removeRecipeAction(recipeId) {
    return (dispatch) => {
        return removeRecipe(recipeId)
            .then(json => {
                showMessage(json, 'Your recipe was archived.');
                return json;
            });
    };
}

function likeRecipeAction(recipeId, payload) {
    return (dispatch) => {
        return likeRecipe(recipeId, payload)
            .then(json => {
                if (!json.error) {
                    dispatch(likeRecipeSuccess());
                }
                showMessage(json, 'You liked that recipe.');
                return json;
            });
    };
}

function showMessage(json, msg) {
    if (!json.error) {
        toast.success(msg);
    } else {
        toast.error(json.description);
    }
}

export { getRecipesAction, createRecipeAction, recipeDetailsAction, editRecipeAction, removeRecipeAction, likeRecipeAction };