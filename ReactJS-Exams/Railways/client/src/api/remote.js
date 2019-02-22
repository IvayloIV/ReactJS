const url = 'http://localhost:5000/';

function requester(endPoint, type, auth, data) {
    let obj = {
        method: type
    };

    if (type === 'POST' || type === 'DELETE') {
        obj['headers'] = {
            'Content-Type': 'application/json'
        }
        obj['body'] = JSON.stringify(data);
    }

    if (auth) {
        if(!obj['headers']) {
            obj['headers'] = {};
        }
        obj['headers']['Authorization'] = `bearer ${localStorage.getItem('authToken')}`;
    }

    return fetch(url + endPoint, obj)
        .then(res => res.json());
}

async function register(name, email, password) {
    return await requester('auth/signup', 'POST', false, { name, email, password });
}

async function login(email, password) {
    return await requester('auth/login', 'POST', false, { email, password });
}

async function getTrips() {
    return await requester('trips', 'GET');
}

async function searchTrips(origin, destination, date) {
    return await requester(`search?origin=${origin}&destination=${destination}&date=${date}`, 'GET');
}

async function getDetails(id) {
    return await requester(`trips/${id}`, 'GET', true);
}

async function addTicket(data) {
    return await requester(`cart`, 'POST', true, data);
}

async function getTickets() {
    return await requester(`cart`, 'GET', true);
}

async function removeTicket(id) {
    return await requester(`cart/${id}`, 'DELETE', true);
}

async function checkout() {
    return await requester(`cart/checkout`, 'POST', true);
}

async function myTrains() {
    return await requester(`cart/history`, 'GET', true);
}

export { register, login, getTrips, searchTrips, getDetails, addTicket, getTickets, removeTicket, checkout, myTrains };