const BASE_URL = `http://${window.location.hostname}:8080/api/`;

export const postData = (url = ``, data = {}, timeOut = 10000) => {
    url = `${BASE_URL}${url}`;
    // Default options are marked with *
    return fetchWithTimeOut(fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()) // parses response to JSON
        .then(res => {
            if (res.code === 200) {
                return res.data;
            } else {
                console.log(res.data);
                return "failed to process request";
            }
        }), timeOut);
};

export const getData = (url = ``, timeOut = 10000) => {
    url = `${BASE_URL}${url}`;
    return fetchWithTimeOut(fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        // body data type must match "Content-Type" header
    })
        .then(response => response.json()) // parses response to JSON
        .then(res => {
            if (res.code === 200) {
                return res.data;
            } else {
                console.log(res.data);
                return "failed to process request";
            }
        }), timeOut);
}

const fetchWithTimeOut = (fetchPromise, timeOut) =>
    Promise.race([
        fetchPromise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeOut)
        )
    ]);


export const updateData = (url = ``, data = {}, timeOut = 10000) => {
    url = `${BASE_URL}${url}`;
    // Default options are marked with *
    return fetchWithTimeOut(fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()) // parses response to JSON
        .then(res => {
            if (res.code === 200) {
                return res.data;
            } else {
                console.log(res.data);
                return "failed to process request";
            }
        }), timeOut);
};

export const deleteData = (url = ``, timeOut = 10000) => {
    url = `${BASE_URL}${url}`;
    // Default options are marked with *
    return fetchWithTimeOut(fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        }
    })
        .then(response => response.json()) // parses response to JSON
        .then(res => {
            if (res.code === 200 && res.status === 'DELETED') {
                return res.data;
            } else {
                console.log(res.data);
                return "failed to process request";
            }
        }), timeOut);
};