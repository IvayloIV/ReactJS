const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function createFurniture(data) {
    const res = await fetch(host + 'furniture/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function getStats() {
    const res = await fetch(host + 'stats');
    return await res.json();
}

async function getFurnitureByPage(page) {
    const res = await fetch(host + `furniture/all?page=${page}`);
    return await res.json();
}

async function myFurniture() {
    const res = await fetch(host + 'furniture/mine', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

async function removeFurniture(id) {
    return await fetch(host + 'furniture/delete/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
}

async function detailsFurniture(id) {
    const res = await fetch(host + 'furniture/details/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

async function createReview(id, data) {
    const res = await fetch(host + `furniture/details/${id}/reviews/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function likeFurniture(id) {
    const res = await fetch(host + `furniture/details/${id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

export { register, login, createFurniture, getStats, getFurnitureByPage, 
    myFurniture, removeFurniture, detailsFurniture, createReview, likeFurniture };
