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

async function createHotel(body) {
    return await requester('hotels/create', 'POST', true, body);
}

async function getHotelsPerPage(page) {
    return await requester(`hotels/all?page=${page}`, 'GET');
}

async function getHotelDetails(id) {
    return await requester(`hotels/details/${id}`, 'GET', true);
}

async function createReview(id, data) {
    return await requester(`hotels/details/${id}/reviews/create`, 'POST', true, data);
}

export { register, login, createHotel, getHotelsPerPage, getHotelDetails, createReview };
