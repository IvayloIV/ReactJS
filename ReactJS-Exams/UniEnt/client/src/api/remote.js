const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_Hk_8_pVjN';
const APP_SECRET = 'abd8f139d7c84a02b67d928a3e6af824';

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

async function getAllEvents() {
    let res = await requester('appdata', 'events', 'GET', 'Kinvey');
    return await res.json();
}

async function createEvent(name, dateTime, description, imageUrl) {
    const currentUsername = sessionStorage.getItem('username');
    const body = {
        name,
        dateTime,
        description,
        imageURL: imageUrl,
        peopleInterestedIn: 0,
        organizer: currentUsername
    };
    let res = await requester('appdata', 'events', 'POST', 'Kinvey', body);
    return await res.json();
}

async function getEventDetails(eventId) {
    let res = await requester('appdata', `events/${eventId}`, 'GET', 'Kinvey');
    return await res.json();
}

async function editEvent(_id, body) {
    const payload = {
        name: body.name,
        dateTime: body.date,
        description: body.description,
        imageURL: body.imageUrl,
        peopleInterestedIn: body.peopleInterestedIn,
        organizer: body.organizer
    };
    let res = await requester('appdata', `events/${_id}`, 'PUT', 'Kinvey', payload);
    return await res.json();
}

async function removeEvent(id) {
    let res = await requester('appdata', `events/${id}`, 'DELETE', 'Kinvey');
    return await res.json();
}

async function joinEvent(id, body) {
    const payload = Object.assign({}, body, {peopleInterestedIn: Number(body.peopleInterestedIn) + 1});
    let res = await requester('appdata', `events/${id}`, 'PUT', 'Kinvey', payload);
    return await res.json();
}

async function getMyEvents() {
    const userId = sessionStorage.getItem('userId');
    let res = await requester('appdata', `events?query={"_acl.creator":"${userId}"}`, 'GET', 'Kinvey');
    return await res.json();
}

export { register, login, logout, getAllEvents, createEvent, getEventDetails, 
    editEvent, removeEvent, joinEvent, getMyEvents };
