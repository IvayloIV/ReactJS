import { GET_ALL_RECIPES, GET_RECIPE_DETAILS, LIKE_RECIPE } from '../actions/actionTypes';

function likeRecipe(state) {
    let newState = state.slice();
    newState[0] = Object.assign({}, state[0], { likesCounter: state[0].likesCounter + 1 });
    return newState;
}

export function recipeReducer(state = [], action) {
    switch (action.type) {
    case GET_ALL_RECIPES:
    case GET_RECIPE_DETAILS:
        return action.data;
    case LIKE_RECIPE:
        return likeRecipe(state);
    default:
        return state;
    }
}
