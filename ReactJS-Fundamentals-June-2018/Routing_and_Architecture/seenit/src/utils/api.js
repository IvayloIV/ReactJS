const appKey = 'kid_HJsB9FCk7';
const appSecret = '4a28caad75f94548ad5309de32338b21';
const baseUrl = 'https://baas.kinvey.com/';

function getAuth(auth) {
    if (auth === 'basic') {
        return `Basic ${btoa(`${appKey}:${appSecret}`)}`;
    } else {
        return `Kinvey ${localStorage.getItem('token')}`;
    }
}

async function makeRequest(endPoint, method, auth, type, payload) {
    let obj = {
        method,
        headers: {
            'Authorization': getAuth(auth),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    if (payload) {
        obj.body = JSON.stringify(payload);
    }

    return await fetch(`${baseUrl}${type}/${appKey}/${endPoint}`, obj)
}

// Users
async function login(payload) {
    return await makeRequest('login', 'POST', 'basic', 'user', payload);
}

async function register(payload) {
    return await makeRequest('', 'POST', 'basic', 'user', payload);
}

async function logout() {
    return await makeRequest('_logout', 'POST', 'kinvey', 'user');
}

// Posts
async function getPosts() {
    return await makeRequest('posts?query={}&sort={"_kmd.ect": -1}', 'GET', 'kinvey', 'appdata');
}

async function createPost(payload) {
    return await makeRequest('posts', 'POST', 'kinvey', 'appdata', payload);
}

async function editPost(payload, id) {
    return await makeRequest(`posts/${id}`, 'PUT', 'kinvey', 'appdata', payload);
}

async function deletePost(id) {
    return await makeRequest(`posts/${id}`, 'DELETE', 'kinvey', 'appdata');
}

async function detailsPost(id) {
    return await makeRequest(`posts/${id}`, 'GET', 'kinvey', 'appdata');
}

async function myPosts(username) {
    return await makeRequest(`posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, 'GET', 'kinvey', 'appdata');
}

// Comments
async function createComment(payload) {
    return await makeRequest(`comments`, 'POST', 'kinvey', 'appdata', payload);
}

async function getComments(postId) {
    return await makeRequest(`comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, 'GET', 'kinvey', 'appdata');
}

async function deleteComment(id) {
    return await makeRequest(`comments/${id}`, 'DELETE', 'kinvey', 'appdata');
}

export default {
    login,
    register,
    logout,
    getPosts,
    createPost,
    deletePost,
    editPost,
    detailsPost,
    myPosts,
    createComment,
    getComments,
    deleteComment
}