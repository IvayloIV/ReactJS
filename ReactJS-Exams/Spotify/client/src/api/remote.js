const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_Skk9OGJi4';
const APP_SECRET = 'f5b886bb7cac476286ab24588435a471';


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
    const req = await requester('user', '', 'POST', 'Basic', { username, password });
    return await req.json();
}

async function login(username, password) {
    const req = await requester('user', 'login', 'POST', 'Basic', { username, password });
    return await req.json();
}

async function logout() {
    return await requester('user', '_logout', 'POST', 'Kinvey');
}

async function createSong(title, artist, imageUrl) {
    const req = await requester('appdata', 'songs', 'POST', 'Kinvey', { 
        title,
        artist,
        imageUrl,
        likes: 0,
        listened: 0
    });
    return await req.json();
}

async function getAllSongs() {
    const req = await requester('appdata', 'songs?query={}&sort={}', 'GET', 'Kinvey');
    return await req.json();
}

async function likeSong(song) {
    const { title, likes, listened, artist, imageUrl } = song;

    const req = await requester('appdata', `songs/${song._id}`, 'PUT', 'Kinvey', {
        title, likes: likes + 1, listened, artist, imageUrl
    });

    return await req.json();
}

async function listenSong(song) {
    const { title, likes, listened, artist, imageUrl } = song;

    const req = await requester('appdata', `songs/${song._id}`, 'PUT', 'Kinvey', {
        title, likes, listened: listened + 1, artist, imageUrl
    });

    return await req.json();
}

async function removeSong(songId) {
    const req = await requester('appdata', `songs/${songId}`, 'DELETE', 'Kinvey');
    return await req.json();
}

async function mySongs() {
    const userId = sessionStorage.getItem('userId');
    const req = await requester('appdata', `songs?query={"_acl.creator":"${userId}"}`, 'GET', 'Kinvey');
    return await req.json();
}

export { register, login, logout, createSong, getAllSongs, likeSong, listenSong, removeSong, mySongs };
