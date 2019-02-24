const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_H19ygc1XQ';
const APP_SECRET = 'e2f999eac40c48c285e8d1f0affde07d';

function requester(module, endPoint, type, auth, data) {
    let obj = {
        method: type,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (auth === 'basic') {
        obj['headers']['Authorization'] = `Basic ${btoa(APP_KEY + ":" + APP_SECRET)}`;
    } else {
        obj['headers']['Authorization'] = `Kinvey ${localStorage.getItem('authToken')}`;
    }

    if (data) {
        obj['body'] = JSON.stringify(data);
    }

    return fetch(BASE_URL + module + '/' + APP_KEY + '/' + endPoint, obj)
        .then(res => {
            if (res.status === 204) {
                return
            } 
            return res.json();
        });
}

async function register(username, password) {
    return await requester('user', '', 'POST', 'basic', { username, password, subscriptions: [] });
}

async function login(username, password) {
    return await requester('user', 'login', 'POST', 'basic', { username, password });
}

async function logout() {
    return await requester('user', '_logout', 'POST', 'kinvey');
}

async function allChirps() {
    const subs = localStorage.getItem('subs');
    return await requester('appdata', `chirps?query={"author":{"$in": ${subs}}}&sort={"_kmd.ect": 1}`, 'GET', 'kinvey');
}

async function countChirps(username) {
    return await requester(`appdata`, `chirps?query={"author":"${username}"}`, 'GET', 'kinvey');
}

async function countFollowing(username) {
    return await requester(`user`, `?query={"username":"${username}"}`, 'GET', 'kinvey');
}

async function countFollowers(username) {
    return await requester(`user`, `?query={"subscriptions":"${username}"}`, 'GET', 'kinvey');
}

async function createChirp(body) {
    return await requester(`appdata`, `chirps`, 'POST', 'kinvey', body);
}

async function feedByUsername(username) {
    return await requester(`appdata`, `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`, 'GET', 'kinvey');
}

async function removeChirp(chirpId) {
    return await requester(`appdata`, 'chirps/' + chirpId, 'DELETE', 'kinvey');
}

async function discover() {
    return await requester(`user`, '', 'GET', 'kinvey');
}

async function follow(username) {
    const userId = localStorage.getItem('userId');
    let subs = JSON.parse(localStorage.getItem('subs'));
    subs.push(username);
    localStorage.setItem('subs', JSON.stringify(subs));
    return await requester(`user`, userId, 'PUT', 'kinvey', {subscriptions: subs});
}

async function unfollow(username) {
    const userId = localStorage.getItem('userId');
    let subs = JSON.parse(localStorage.getItem('subs'));
    subs = subs.filter(a => a !== username);
    localStorage.setItem('subs', JSON.stringify(subs));
    return await requester(`user`, userId, 'PUT', 'kinvey', {subscriptions: subs});
}

export { register, login, logout, allChirps, countChirps, 
    countFollowing, countFollowers, createChirp, feedByUsername, removeChirp,
    discover, follow, unfollow
};
