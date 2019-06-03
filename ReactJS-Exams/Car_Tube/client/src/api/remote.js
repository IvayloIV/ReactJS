const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_Sk-zXnaS7';
const APP_SECRET = '5da46c27f536489fbbb928f85dc8a39b';

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

async function getAllCars() {
    let res = await requester('appdata', 'cars?query={}&sort={"_kmd.ect": -1}', 'GET', 'Kinvey');
    return await res.json();
}

async function createCar(seller, title, description, imageUrl, brand, model, fuel, year, price) {
    let res = await requester('appdata', 'cars', 'POST', 'Kinvey', { seller, title, description, imageUrl, brand, model, fuel, year, price });
    return await res.json();
}

async function getCarDetails(carId) {
    let res = await requester('appdata', `cars/${carId}`, 'GET', 'Kinvey');
    return await res.json();
}

async function editCar(id, seller, title, description, imageUrl, brand, model, fuel, year, price) {
    let res = await requester('appdata', `cars/${id}`, 'PUT', 'Kinvey', { seller, title, description, imageUrl, brand, model, fuel, year, price });
    return await res.json();
}

async function getCarsByUsername(username) {
    let res = await requester('appdata', `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`, 'GET', 'Kinvey');
    return await res.json();
}

async function removeCar(carId) {
    let res = await requester('appdata', `cars/${carId}`, 'DELETE', 'Kinvey');
    return await res.json();
}

export { register, login, logout, getAllCars, createCar, getCarDetails, editCar, getCarsByUsername, removeCar };