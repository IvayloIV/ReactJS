const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_ByuSzo8b4';
const APP_SECRET = 'd3efb20e7e714d68bb78359dbc1272c1';

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

async function getPets() {
    let res = await requester('appdata', 'pets', 'GET', 'Kinvey');
    return await res.json();
}

async function createPet(name, description, imageURL, category) {
    const payload = { name, description, imageURL, category, likes: 0 };
    let res = await requester('appdata', 'pets', 'POST', 'Kinvey', payload);
    return await res.json();
}

async function getMyPets() {
    const userId = sessionStorage.getItem('userId');
    let res = await requester('appdata', `pets?query={"_acl.creator":"${userId}"}`, 'GET', 'Kinvey');
    return await res.json();
}

async function getPetDetails(petId) {
    let res = await requester('appdata', `pets/${petId}`, 'GET', 'Kinvey');
    return await res.json();
}

async function editPet(petId, name, description, imageURL, category, likes) {
    const payload = { name, description, imageURL, category, likes };
    let res = await requester('appdata', `pets/${petId}`, 'PUT', 'Kinvey', payload);
    return await res.json();
}

async function removePet(petId) {
    let res = await requester('appdata', `pets/${petId}`, 'DELETE', 'Kinvey');
    return await res.json();
}

async function likePet(petId, payload) {
    let res = await requester('appdata', `pets/${petId}`, 'PUT', 'Kinvey', Object.assign({}, payload, {
        likes: payload.likes + 1
    }));

    return await res.json();
}

export { register, login, logout, getPets, createPet, getMyPets, getPetDetails, editPet, removePet, likePet };