const port = 9999;

export function getStreets() {
    return fetch(`http://localhost:${port}/feed/street/all`)
        .then(res => res.json())
        .then(data => data);
}