const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_rJkEqpLj4';
const APP_SECRET = '2d9147296abf472698609982a26e300d';

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

async function createMovie(title, imageUrl, description, genres, tickets) {
    let res = await requester('appdata', 'movies', 'POST', 'Kinvey', { title, imageUrl, description, genres, tickets });
    return await res.json();
}

async function getAllMovies() {
    let res = await requester('appdata', 'movies', 'GET', 'Kinvey');
    return await res.json();
}

async function getMyMovies() {
    const userId = sessionStorage.getItem('userId');
    let res = await requester('appdata', `movies?query={"_acl.creator":"${userId}"}`, 'GET', 'Kinvey');
    return await res.json();
}

async function getMovieDetails(movieId) {
    let res = await requester('appdata', `movies/${movieId}`, 'GET', 'Kinvey');
    return await res.json();
}

async function editMovie(movieId, title, imageUrl, description, genres, tickets) {
    let res = await requester('appdata', `movies/${movieId}`, 'PUT', 'Kinvey', { title, imageUrl, description, genres, tickets });
    return await res.json();
}

async function removeMovie(movieId) {
    let res = await requester('appdata', `movies/${movieId}`, 'DELETE', 'Kinvey');
    return await res.json();
}

export { register, login, logout, createMovie, getAllMovies, getMyMovies, getMovieDetails, editMovie, removeMovie };
