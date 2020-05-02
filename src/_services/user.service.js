import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    register,
    login,
    logout,
    addpost,
    getPost,
    savePost,
    getAllPosts,
    getUsername,
    deletePost,
    getAll
};

function register(firstname, lastname, username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, username, password })
    };

    return fetch(`${config.apiUrl}/register`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}

function login(username, password, remembered) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        })
        .then(function (token) {
            // save the token to localstorage
            remembered ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
        });
}

function logout() {
    // remove token from local storage to log user out
    //remembered ? localStorage.removeItem('token') : sessionStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
}

function addpost(title, subject) {
    let token = '';
    if (sessionStorage.getItem('token')) token = sessionStorage.getItem('token');
    else token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, subject })
    };

    return fetch(`${config.apiUrl}/addpost`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}

function getPost(postID) {
    let token = '';
    if (sessionStorage.getItem('token')) token = sessionStorage.getItem('token');
    else token = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    };

    return fetch(`${config.apiUrl}/getPost`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}

function savePost(id, title, subject) {
    let token = '';
    if (sessionStorage.getItem('token')) token = sessionStorage.getItem('token');
    else token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id, title, subject })
    };

    return fetch(`${config.apiUrl}/savePost`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}

function deletePost(id) {
    let token = '';
    if (sessionStorage.getItem('token')) token = sessionStorage.getItem('token');
    else token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    };

    return fetch(`${config.apiUrl}/deletePost`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}



function getAllPosts() {
    let token = '';
    if (sessionStorage.getItem('token')) token = sessionStorage.getItem('token');
    else token = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(`${config.apiUrl}/getAllPosts`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getUsername() {
    let token = '';
    if (sessionStorage.getItem('token')) token = sessionStorage.getItem('token');
    else token = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };

    return fetch(`${config.apiUrl}/getUser`, requestOptions)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.text();
        });
}

// function to add Authorization header for http request

function authResponse(response) {
    if (response.status === 401) {
        // delete token from storage / logout
        logout();
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
}