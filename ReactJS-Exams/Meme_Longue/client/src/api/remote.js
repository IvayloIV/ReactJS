const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_SkuSX2vDm';
const APP_SECRET = 'b90891b91d36463e8a336b67ae6ec00e';

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

async function register(username, password) {
    let res = await requester('user', '', 'POST', 'Basic', { username, password });
    return await res.json();
}

async function login(username, password) {
    let res = await requester('user', 'login', 'POST', 'Basic', { username, password });
    return await res.json();
}

async function logout() {
    return await requester('user', '_logout', 'POST', 'Kinvey', {});
}

async function getAllMemes() {
    let res = await requester('appdata', 'memes?query={}&sort={"_kmd.ect": -1}', 'GET', 'Kinvey');
    return await res.json();
}

async function createMeme(creator, title, description, imageUrl) {
    let res = await requester('appdata', 'memes', 'POST', 'Kinvey', { creator, title, description, imageUrl });
    return await res.json();
}

async function editMeme(_id, creator, title, description, imageUrl) {
    const payload = { creator, title, description, imageUrl };
    let res = await requester('appdata', `memes/${_id}`, 'PUT', 'Kinvey', payload);
    return await res.json();
}

async function getDetailsMeme(_id) {
    let res = await requester('appdata', `memes/${_id}`, 'GET', 'Kinvey');
    return await res.json();
}

async function removeMeme(_id) {
    let res = await requester('appdata', `memes/${_id}`, 'DELETE', 'Kinvey');
    return await res.json();
}

async function getUserById(id) {
    let res = await requester('user', id, 'GET', 'Kinvey');
    return await res.json();
}

async function getMemeByUsername(username) {
    let res = await requester('appdata', `memes?query={"creator":"${username}"}&sort={"_kmd.ect": -1}`, 'GET', 'Kinvey');
    return await res.json();
}

async function removeUser(userId) {
    return await requester('user', userId, 'DELETE', 'Kinvey');
}

export { register, login, logout, getAllMemes, createMeme, editMeme, getDetailsMeme, 
    removeMeme, getUserById, getMemeByUsername, removeUser };