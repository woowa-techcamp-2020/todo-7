const defaultOptions = {
    mode: 'cors', // no-cors, cors, *same-origin
    headers: {
        'Content-Type': 'application/json',
    },
}

const createQuery = (data) => Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

export const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...defaultOptions,
    });
    return await response.json();
}  

export const get = async (url = '', data = {}) => {
    const response = await fetch(`${url}?${createQuery(data)}`, {
        method: 'GET',
        body: JSON.stringify(data),
    });
    return await response.json();
}
      