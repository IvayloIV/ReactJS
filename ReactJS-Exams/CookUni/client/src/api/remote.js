import categoryUrls from '../categoryUrls';

const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_r1MHI2YoE';
const APP_SECRET = '3e090c4f39594aea88fff5154b93edfd';

function requester(module, endPoint, type, auth, data) {
    let obj = {
        method: type,
        headers: {'Content-Type':'application/json'}
    };

    if (data) {
        obj['body'] = JSON.stringify(data);
    }

    if (auth === 'Basic') {
        obj['headers']['Authorization'] = `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`;
    } else {
        obj['headers']['Authorization'] = `Kinvey ${sessionStorage.getItem('authToken')}`;
    }

    return fetch(BASE_URL + module + '/' + APP_KEY + '/' + endPoint , obj);
}

async function register(username, password, firstName, lastName) {
    let res = await requester('user', '', 'POST', 'Basic', { username, password, firstName, lastName });
    return await res.json();
}

async function login(username, password) {
    let res = await requester('user', 'login', 'POST', 'Basic', { username, password });
    return await res.json();
}

async function logout() {
    return await requester('user', '_logout', 'POST', 'Kinvey', {});
}

async function getRecipes() {
    let res = await requester('appdata', 'recipes', 'GET', 'Kinvey');
    return await res.json();
}

async function createRecipe(payload) {
    payload.likesCounter = 0;
    payload.categoryImageURL = categoryUrls[payload.category];
    let res = await requester('appdata', 'recipes', 'POST', 'Kinvey', payload);
    return await res.json();
}

async function getRecipeDetails(recipeId) {
    let res = await requester('appdata', `recipes/${recipeId}`, 'GET', 'Kinvey');
    return await res.json();
}

async function editRecipe(recipeId, payload) {
    payload.categoryImageURL = categoryUrls[payload.category];
    let res = await requester('appdata', `recipes/${recipeId}`, 'PUT', 'Kinvey', payload);
    return await res.json();
}

async function removeRecipe(recipeId) {
    let res = await requester('appdata', `recipes/${recipeId}`, 'DELETE', 'Kinvey');
    return await res.json();
}

async function likeRecipe(recipeId, payload) {
    let res = await requester('appdata', `recipes/${recipeId}`, 'PUT', 'Kinvey', Object.assign({}, payload, {
        likesCounter: payload.likesCounter + 1
    }));
    return await res.json();
}

export { register, login, logout, getRecipes, createRecipe, getRecipeDetails, editRecipe, removeRecipe, likeRecipe };