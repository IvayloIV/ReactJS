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

export { register, login };
